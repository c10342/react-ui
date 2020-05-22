import React from "react";

import { storiesOf } from "@storybook/react";

import { action } from "@storybook/addon-actions";

import AutoComplete from "./autoComplete";

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
    return lakers.filter((item) => item.value.includes(key));
  };
  return (
    <div className="width-500">
      <AutoComplete
        placeholder="请输入"
        fetchSuggestions={fetchSuggestions}
        onSelect={action("selected")}
      />
    </div>
  );
};

// 自定义下拉选项
const autoCompleteByOption = () => {
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
    return lakers.filter((item) => item.value.includes(key));
  };
  return (
    <div className="width-500">
      <AutoComplete
        placeholder="请输入"
        fetchSuggestions={fetchSuggestions}
        onSelect={action("selected")}
        renderOptions={(item) => <h2>{item.value}</h2>}
      />
    </div>
  );
};

const autoCompleteByAsync = () => {
  const fetchSuggestions = (query: string) => {
    return fetch("https://api.github.com/search/users?q=" + query)
      .then((res) => res.json())
      .then(({ items }) => {
        return items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }));
      });
  };
  return (
    <div className="width-500">
      <AutoComplete
        placeholder="请输入"
        fetchSuggestions={fetchSuggestions}
        onSelect={action("selected")}
        renderOptions={(item) => <h2>{item.value}</h2>}
      />
    </div>
  );
};

storiesOf("AutoComplete 自动完成", module)
  .addParameters({
    info: {
      text: `
    ## 引用方法
    ~~~js
    import {AutoComplete} from 'lin-react-ui
    ~~~
    `,
    },
  })
  .add("默认的 AutoComplete", defaultAutoComplete)
  .add("自定义下拉选项", autoCompleteByOption)
  .add("异步请求github用户名", autoCompleteByAsync);
