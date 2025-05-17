import React, { createContext, useEffect, useState } from "react";
import ApiManager from "../Utilies/ApiManager";
export const HomeContentContext = createContext();
function HomeContentProvider({ children }) {
  const [homeContent, setHomeContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // get data from api
  const getData = async () => {
    setIsLoading(true);
    try {
      let { data } = await ApiManager.getHomeData();
      setHomeContent(data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <HomeContentContext.Provider
      value={{ homeContent, isLoading }}
    >
      {children}
    </HomeContentContext.Provider>
  );
}

export default HomeContentProvider;
