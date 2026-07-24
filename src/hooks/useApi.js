import { useEffect, useState } from "react";

const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
        setLoaded(true);
      })
      .catch((error) => console.error(error));
  }, [url]);

  return { loaded, data };
};

export default useApi;
