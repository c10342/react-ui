import React, { FC } from "react";
import { theme } from "../Icon/icon";
export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: theme;
}

const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme } = props;
  return (
    <div className="lin-progress-bar" style={styles}>
      <div
        className="lin-progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`lin-progress-bar-inner lin-color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="lin-inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
};
export default Progress;
