import React, { createContext, useState } from "react";
import classnames from "classnames";
import MenuItem, { MenuItemProps } from "./menuItem";
import SubMenu from "./subMenu";

// 菜单方向
type MenuMode = "horizontal" | "vertical";

type SelectCallback = (selectIndex: string) => void;

export interface MenuProps {
  // 默认高亮的菜单
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenMenu?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: "vertical" | "horizontal";
  defaultOpenMenu?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: "0" });

const Menu: React.FC<MenuProps> = (props) => {
  const {
    className,
    mode,
    style,
    children,
    defaultIndex,
    onSelect,
    defaultOpenMenu,
  } = props;
  const [currentActive, setCurrentActive] = useState(defaultIndex);
  const classes = classnames("lin-menu", className, {
    "lin-menu-vertical": mode === "vertical",
    "lin-menu-horizontal": mode !== "vertical",
  });
  const handleClick = (index: string) => {
    setCurrentActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode,
    defaultOpenMenu,
  };
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >;
      const { displayName } = childElement.type;
      if (
        displayName === MenuItem.displayName ||
        displayName === SubMenu.displayName
      ) {
        // 这里使用cloneElement是为了在使用MenuItem时可以不传入index属性，我们在这里给他默认传入
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.error("Menu has a child which is not a MenuItem component");
      }
    });
  };
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenMenu: [],
};

export default Menu;
