import React, { createContext, useState } from "react";

import TabItem, { TabItemProps } from "./tabItem";

export interface TabsProps {
  defaultIndex?: number;
  onSelect?: (index: number) => void;
  type?: "line" | "card";
  className?: string;
}

interface ITabsContext {
  index: number;
  onSelect?: (index: number, element: React.ReactNode) => void;
  type: "line" | "card";
}

export const TabsContext = createContext<ITabsContext>({
  index: 0,
  type: "line",
});

const Tabs: React.FC<TabsProps> = (props) => {
  const { defaultIndex, onSelect, children, className, type } = props;
  const [currentActive, setCurrentActive] = useState(defaultIndex);
  const childrenElements = children as React.FunctionComponentElement<any>[];
  const [content, setContent] = useState<React.ReactNode>(
    React.cloneElement(childrenElements[0]).props.children
  );
  const handleClick = (index: number, element: React.ReactNode) => {
    setCurrentActive(index);
    if (onSelect) {
      onSelect(index);
    }
    if (element) {
      setContent(element);
    } else {
      setContent(null);
    }
  };
  const MyContext: ITabsContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
    type: type ? type : "line",
  };
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        TabItemProps
      >;
      if (childElement.type.displayName === TabItem.displayName) {
        return React.cloneElement(childElement, {
          index: childElement.props.index ? childElement.props.index : index,
          label: childElement.props.label,
        });
      } else {
        console.error("Tabs has a child which is not a TabItem component");
        return null;
      }
    });
  };
  return (
    <div className={className} data-testid="test-tabs">
      <ul className="lin-tabs">
        <TabsContext.Provider value={MyContext}>
          {renderChildren()}
        </TabsContext.Provider>
      </ul>
      <div className="lin-tabs-content" data-testid="test-tabs-content">
        {content}
      </div>
    </div>
  );
};

Tabs.defaultProps = {
  defaultIndex: 0,
  type: "line",
};
export default Tabs;
