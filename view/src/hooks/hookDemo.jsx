import React, { useState, useEffect } from "react";
import axios from "axios";
const useFetchAPI = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(url).then((res) => {
      if (res.data) {
        setData(res.data);
      }
    });
  }, []);

  return data;
};

export default useFetchAPI;
