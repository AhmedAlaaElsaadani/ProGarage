import React, { Suspense, useContext } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../../Components/Ui/ScrollToTop/ScrollToTop";
import { IsMobileContext } from "../../contexts/IsMobileContext";
import Navbar from "../../Components/Navbar/Navbar";
import WhatsappComponent from "../../Components/Ui/WhatsappComponent/WhatsappComponent";
import Spinner from "../../Components/Ui/Spinner/Spinner";

export default function RoutLayout() {
  const { isMobile } = useContext(IsMobileContext);

  return (
    <>
      <ScrollToTop />

      <Suspense fallback={<Spinner sectionFlag={false} />}>
        {!isMobile && <Navbar />}
        <WhatsappComponent />
      </Suspense>
      <Outlet />
    </>
  );
}
