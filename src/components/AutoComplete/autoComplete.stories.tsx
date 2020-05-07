import React from "react";

import { storiesOf } from "@storybook/react";

import { action } from "@storybook/addon-actions";

import AutoComplete, { DataSourceType } from "./autoComplete";

const defaultAutoComplete = () => {
  const lakers = [
    { value: "bradley" },
    { value: "pope" },
    { value: "caruso" },
    { value: "cook" },
    { value: "cousins" },
    { value: "james" },
    { value: "AD" },
    { value: "green" },
    { value: "howard" },
    { value: "kuzma" },
    { value: "McGee" },
    { value: "rando" },
  ];
  const fetchSuggestions = (key: string) => {
    return new Promise<{ value: string }[]>((resolve) => {
      setTimeout(() => {
        const arr = lakers.filter((item) => item.value.includes(key));
        resolve(arr);
      }, 2000);
    });
    // return lakers.filter((item) => item.value.includes(key));
  };
  const handleSelect = (item: DataSourceType) => {
    console.log(item);
  };
  return (
    <div className="width-500">
      <AutoComplete
        fetchSuggestions={fetchSuggestions}
        onSelect={handleSelect}
      />
    </div>
  );
};

storiesOf("AutoComplete 自动完成", module).add(
  "默认的 AutoComplete",
  defaultAutoComplete
);
