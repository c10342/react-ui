import React, { useContext,FC } from "react";

import classnames from "classnames";
import { TabsContext } from "./tabs";

export interface TabItemProps {
  /** Tab选项上面的文字 */
  label: string | React.ReactElement;
  /** Tab索引 */
  index?: number;
  /** Tab选项是否被禁用 */
  disabled?: boolean;
}

export const TabItem: FC<TabItemProps> = (props) => {
  const { label, index, children, disabled } = props;
  const context = useContext(TabsContext);
  const classes = classnames("lin-tab-item", {
    "lin-tab-item-active": index === context.index,
    "lin-tab-item-line": context.type === "line",
    "lin-tab-item-card": context.type === "card",
    "lin-tab-item-disabled": disabled,
  });
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (context.onSelect && typeof index === "number" && !disabled) {
      context.onSelect(index, children);
    }
  };
  return (
    <li className={classes} onClick={handleClick}>
      {label}
    </li>
  );
};

TabItem.defaultProps = {
  disabled: false,
};

TabItem.displayName = "TabItem";

export default TabItem;
