import { useCallback, useState } from "react";

export default (initalized = null) => {
  const [value, setValue] = useState(initalized);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler];
};
