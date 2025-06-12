import React, { Suspense, useContext } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../../Components/Ui/ScrollToTop/ScrollToTop";
import { IsMobileContext } from "../../Contexts/IsMobileContext.jsx";
import Navbar from "../../Components/Navbar/Navbar";
import WhatsappComponent from "../../Components/Ui/WhatsappComponent/WhatsappComponent";
import Footer from "../../Components/Footer/Footer.jsx";
import { authContext } from "../../Contexts/authContext.jsx";
import ProfileIcon from "../../Components/Ui/ProfileIcon/ProfileIcon.jsx";
import MobileNav from "../../Components/Ui/MobileNav/MobileNav.jsx";

export default function RoutLayout() {
  const { isMobile } = useContext(IsMobileContext);
  const { isRegistered } = useContext(authContext);

  return (
    <>
      {/* Scroll to top */}
      <ScrollToTop />
      {isMobile ? <MobileNav /> : <Navbar />}
      <WhatsappComponent />
      {isRegistered && <ProfileIcon />}


      {/* Content which appeared to user */}
      <Outlet />


      <Footer />
    </>
  );
}
