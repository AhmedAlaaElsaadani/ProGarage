import React, { createContext, use, useEffect, useState } from "react";
export const IsMobileContext = createContext();
export default function IsMobileProvider({ children }) {
  const [isMobile, setIsMobile] = useState(null);

  const checkMobile = (e) => {
    setIsMobile(e.matches);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:992px)");
    mediaQuery.addEventListener("change", checkMobile);
    setIsMobile(window.matchMedia("(max-width:992px)").matches);
    return () => mediaQuery.removeEventListener("change", checkMobile);
  }, []);
  useEffect(() => {
    console.log(isMobile);
  }, [isMobile]);

  return (
    <IsMobileContext.Provider value={{ isMobile }}>
      {children}
    </IsMobileContext.Provider>
  );
}
