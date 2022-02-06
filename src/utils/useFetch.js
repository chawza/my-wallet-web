import { useEffect, useState } from "react";
import { createHeader } from "./Common";

const useFetch = ( url, params = [], method = 'GET' ) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const refetch = async () => {
    setLoading(true);
    const searchParam = new URLSearchParams();
    for (let param of Object.keys(params)) {
      let paramValue = params[param];
      if (paramValue instanceof(Object)) {
        paramValue = JSON.stringify(paramValue)
      }
      searchParam.append(param, paramValue);
    }

    const requestParam = `${url}?${searchParam.toString()}`;
    const request = new Request(
      requestParam,
      {
        method,
        headers: createHeader()
      }
    )
    const response = await fetch(request);
    setData(await response.json());

    setLoading(false)
  }

  useEffect(() => {
    refetch()
  }, [])

  return {
    data,
    loading,
    refetch
  }
}

export default useFetch;