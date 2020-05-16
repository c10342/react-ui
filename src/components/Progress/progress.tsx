import React, { FC } from "react";
import { theme } from "../Icon/icon";
export interface ProgressProps {
  /** 进度百分数 */
  percent: number;
  /** 进度条高度 */
  strokeHeight?: number;
  /** 是否需要显示文字 */
  showText?: boolean;
  /** 自定义样式 */
  styles?: React.CSSProperties;
  /** 主题色 */
  theme?: theme;
}

export const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme } = props;
  return (
    <div className="lin-progress-bar" style={styles}>
      <div
        className="lin-progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`lin-progress-bar-inner lin-inner-color-${theme}`}
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
