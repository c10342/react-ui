import React, { useContext,FC } from "react";
import classnames from "classnames";

import { MenuContext } from "./menu";

export interface MenuItemProps {
  /** 索引 */
  index?: string;
  /** 选项是否被禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 选项的自定义 style */
  style?: React.CSSProperties;
}

export const MenuItem: FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext);
  const classes = classnames("lin-menu-item", className, {
    "lin-menu-item-is-disabled": disabled,
    "lin-menu-item-is-active": context.index === index,
  });
  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === "string") {
      context.onSelect(index);
    }
  };
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.displayName = "MenuItem";

export default MenuItem;
