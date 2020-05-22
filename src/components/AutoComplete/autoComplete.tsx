import React, {
  FC,
  useState,
  ChangeEvent,
  ReactElement,
  useEffect,
  KeyboardEvent,
  useRef,
} from "react";

import classnames from "classnames";

import Input, { InputProps } from "../Input/input";

import Icon from "../Icon/icon";

import Transition from "../Transition/transition";

import useDebound from "../../hooks/useDebound";

import useClickOutside from "../../hooks/useClickOutside";

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (
    key: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOptions?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOptions,
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState(value as string);

  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);

  const [loading, setLoading] = useState(false);

  const [highlightIndex, setHighlightIndex] = useState(-1);

  const [showDropDown, setShowDropDown] = useState(false);

  const triggerSearch = useRef(false);

  const compRef = useRef<HTMLDivElement>(null);

  const deboundVal = useDebound(inputValue, 500);

  useClickOutside(compRef, () => {
    setSuggestions([]);
    setShowDropDown(false);
  });

  useEffect(() => {
    if (deboundVal && triggerSearch.current) {
      setSuggestions([]);
      setShowDropDown(false);
      setHighlightIndex(-1);
      const result = fetchSuggestions(deboundVal);
      if (result instanceof Promise) {
        setLoading(true);
        result
          .then((data) => {
            setSuggestions(data);
            setLoading(false);
            if (data.length > 0) {
              setShowDropDown(true);
            } else {
              setShowDropDown(false);
            }
          })
          .catch((err) => {
            setSuggestions([]);
            setLoading(false);
          });
      } else {
        setSuggestions(result);
        if (result.length > 0) {
          setShowDropDown(true);
        } else {
          setShowDropDown(false);
        }
      }
    } else {
      setSuggestions([]);
      setShowDropDown(false);
    }
  }, [deboundVal, fetchSuggestions]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setInputValue(val);
    triggerSearch.current = true;
  };

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);

    setShowDropDown(false);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };

  const highlight = (index: number) => {
    if (index <= 0) {
      index = 0;
    }
    if (index >= suggestions.length - 1) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      // 回车
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      // 向上箭头
      case 38:
        highlight(highlightIndex - 1);
        break;
      // 向下箭头
      case 40:
        highlight(highlightIndex + 1);
        break;
      // esc
      case 27:
        setSuggestions([]);
        setShowDropDown(false);
        break;
    }
  };
  const renderOptionsTemplate = (item: DataSourceType) => {
    return renderOptions ? renderOptions(item) : item.value;
  };
  const generateDropDown = () => {
    return (
      <Transition
        in={showDropDown || loading}
        animation="zoom-in-top"
        timeout={500}
      >
        <ul className="lin-dropDown-list">
          {loading && (
            <li className="lin-suggstions-loading-icon">
              <Icon icon="spinner" spin />
            </li>
          )}
          {suggestions.map((item, index) => {
            const classes = classnames("lin-suggstions-item", {
              "lin-suggstions-active": index === highlightIndex,
            });
            return (
              <li
                className={classes}
                key={index}
                onClick={() => {
                  handleSelect(item);
                }}
              >
                {renderOptionsTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };

  return (
    <div ref={compRef} className="lin-auto-complete">
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {generateDropDown()}
    </div>
  );
};

export default AutoComplete;
