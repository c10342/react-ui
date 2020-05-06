import React, { useContext, useState,FC } from "react";
import classnames from "classnames";
import { MenuContext } from "./menu";
import MenuItem, { MenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";
import Transition from '../Transition/transition'

export interface SubMenuProps {
  /** 索引 */
  index?: string;
  /** 下拉菜单选项的文字 */
  title: string;
  /** 自定义类名 */
  className?: string;
}

export const SubMenu: FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props;

  const context = useContext(MenuContext);
  const isOpen =
    index && context.mode === "vertical"
      ? context.defaultOpenMenu?.includes(index)
      : false;
  const [menuOpen, setMenuOpen] = useState(isOpen);
  const classes = classnames("lin-menu-item lin-submenu-item", className, {
    "lin-menu-item-is-active": context.index === index,
    "lin-submenu-active": context.index.split("-").includes(index || ""),
    "lin-submenu-open": menuOpen,
    "lin-submenu-vertical": context.mode === "vertical",
  });
  const handelClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };
  let timer: any;
  const handelMouse = (e: React.MouseEvent, toggle: boolean) => {
    if (timer) {
      clearTimeout(timer);
    }
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  };

  const clickEvent =
    context.mode === "vertical"
      ? {
          onClick: handelClick,
        }
      : {};
  const mouseEvent =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handelMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handelMouse(e, false);
          },
        }
      : {};
  const renderChildren = () => {
    const subMenuClasses = classnames("lin-submenu", {
      "lin-submenu-open": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >;
      const { displayName } = childElement.type;
      if (
        displayName === MenuItem.displayName ||
        displayName === SubMenu.displayName
      ) {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error(
          "SubMenu has a child which is not a MenuItem or SubMenu component"
        );
      }
    });

    return (
      <Transition animation='zoom-in-top' in={menuOpen} timeout={200}>
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    );
  };

  return (
    <li
      key={index}
      className={classes}
      {...mouseEvent}
      data-testid="test-submenu"
    >
      <div className="lin-submenu-title" {...clickEvent}>
        {title}
        <Icon icon="angle-down" className="lin-arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
