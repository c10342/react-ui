import React, { useContext } from "react";
import classnames from "classnames";

import { MenuContext } from "./menu";

export interface MenuItemProps {
  // MenuItem索引
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
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
