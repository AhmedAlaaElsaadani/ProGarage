import React, { Suspense, useContext } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../../Components/Ui/ScrollToTop/ScrollToTop";
import { IsMobileContext } from "../../contexts/IsMobileContext";
import Navbar from "../../Components/Navbar/Navbar";
import WhatsappComponent from "../../Components/Ui/WhatsappComponent/WhatsappComponent";
import Spinner from "../../Components/Ui/Spinner/Spinner";
import Footer from "../../Components/Footer/Footer.jsx";
import { authContext } from "../../Contexts/authContext.jsx";
import ProfileIcon from "../../Components/Ui/ProfileIcon/ProfileIcon.jsx";

export default function RoutLayout() {
  const { isMobile } = useContext(IsMobileContext);
  const { isRegistered } = useContext(authContext);

  return (
    <>
      <ScrollToTop />

      <Suspense fallback={<Spinner sectionFlag={false} />}>
        <Navbar />
        <WhatsappComponent />
        {isRegistered && <ProfileIcon />}
      </Suspense>
      <Outlet />
      <Footer />
    </>
  );
}
