import React, { useContext, useState } from "react";
import classnames from "classnames";
import { MenuContext } from "./menu";
import MenuItem, { MenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
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

    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
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
