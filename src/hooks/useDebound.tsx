import { useEffect, useState } from "react";

// 模拟函数防抖，每次更新太快，函数还没执行就被清掉了
const useDebound = (value: any, delay: number = 300) => {
  const [deboundVal, setDeboundVal] = useState(value);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDeboundVal(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return deboundVal;
};

export default useDebound;
