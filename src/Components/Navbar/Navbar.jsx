import React, { useContext, useEffect, useRef, useState } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useLocation } from "react-router-dom";
// import logo from "../../assets/Images/logo.svg";
import { HashLink } from "react-router-hash-link";
import style from "./Navbar.module.css";
import { motion } from "framer-motion";
import { IsMobileContext } from "../../contexts/IsMobileContext";
import { authContext } from "../../Contexts/authContext";
// import NavbarTop from "../NavbarTop/NavbarTop";
// import SubMenuNavbar from "../Ui/SubMenuNavbar/SubMenuNavbar";
import whiteLogo from "../../assets/Images/whiteLogo.svg";
import Swal from "sweetalert2";
import ApiManager from "../../Utilies/ApiManager";

const Navbar = () => {
  const [navbarCollapse, setNavbarCollapse] = useState();
  const { setToken, token, isRegistered } = useContext(authContext);
  const location = useLocation();
  const [active, setActive] = useState("Home");
  const navBar = useRef(null);
  const { isMobile } = useContext(IsMobileContext);

  const links = [
    {
      link: "Home",
      active: "Home",
      to: "./#Home",
    },
    {
      link: "About",
      active: "About",
      to: "About#About",
    },
    {
      link: "Products",
      active: "Products",
      to: "Products#Products",
    },
    {
      link: "Repair Request",
      active: "repairRequest",
      to: "repairRequest#repairRequest",
    },
    {
      link: "Contact",
      active: "Contact",
      to: "Contact#Contact",
    },
  ];

  // logout function
  const logOut = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#469791",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setToken(null);
          await ApiManager.logOut(token);
          Swal.fire({
            title: "Logged out!",
            text: "You have been successfully logged out.",
            icon: "success",
            confirmButtonText: "Ok",
          });
        } catch (error) {
          console.error("Logout failed:", error);
          Swal.fire(
            "Error!",
            "Something went wrong. Please try again.",
            "error"
          );
        }
      }
    });
    setShowSubMenu(!showSubMenu);
  };

  const hideNavbar = () => {
    navbarCollapse.hide();
  };

  // const toggleLanguage = () => {
  //   let flagDirection = i18n.language == "en";

  //   flagDirection ? i18n.changeLanguage("ar") : i18n.changeLanguage("en");
  //   if (flagDirection) {
  //     document.body.style.direction = "rtl";
  //     document.title = "منصة حروف التعليمبة";
  //   } else {
  //     document.body.style.direction = "ltr";
  //     document.title = "Harouf Education Platform";
  //   }
  // };
  useEffect(() => {
    // Manually collapse the navbar when a link is clicked
    setNavbarCollapse(
      new bootstrap.Collapse(
        document.getElementById("navbarSupportedContent"),
        {
          toggle: false,
        }
      )
    );
    // Add padding to the body to prevent the content from being hidden behind the navbar when the page is scrolled
    if (!isMobile) {
      document.body.style.paddingTop = navBar.current.clientHeight + "px";
    } else {
      document.body.style.paddingTop = "0px";
    }
    return () => {
      document.body.style.paddingTop = "0px";
    };
  }, []);
  useEffect(() => {
    const options = { threshold: 0.1 };
    let observer;

    const createObserver = () => {
      const sections = document.querySelectorAll("section");
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      }, options);

      sections.forEach((section) => observer.observe(section));
    };

    // Initial setup
    createObserver();

    // MutationObserver to detect newly loaded sections
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          if (observer) observer.disconnect(); // Disconnect previous observer
          createObserver(); // Recreate observer with new sections
        }
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer && observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname]);

  return (
    <>
      <nav
        id="navBarMain"
        className={
          "navbar lead navbar-expand-lg  fixed-top p-0 shadow flex-column " +
          style["navbar"]
        }
        data-bs-theme={
          "dark"
          // : "light"
        }
        ref={navBar}
      >
        <div className="container d-flex justify-content-between  ">
          <HashLink
            className="navbar-brand  py-3 rounded-3 overflow-hidden"
            to="/"
          >
            <motion.img
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              src={whiteLogo}
              style={{ height: "53px" }}
              alt="logo website "
            />
          </HashLink>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => {
              navbarCollapse.toggle();
            }}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={"collapse navbar-collapse  " + style["list-links"]}
            id="navbarSupportedContent"
          >
            <div />
            <ul className="navbar-nav gap-3 ">
              {links.map((link, idx) => (
                <motion.li
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  key={idx}
                  className="nav-item "
                >
                  <Link
                    className={
                      "nav-link " +
                      (link.active == active ? style["selected"] : "")
                    }
                    to={link.to}
                    onClick={hideNavbar}
                  >
                    {link.link}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.ul
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="navbar-nav  d-flex justify-content-center align-items-center gap-3"
            >
              {isRegistered ? (
                <>
                  <li>
                    <Link to="/cart" className={style.cart}>
                      <i className="fa-solid fa-cart-shopping"></i>{" "}
                    </Link>
                  </li>
                  <li>
                    <button onClick={logOut} className={style["registerBtn"]}>
                      Log out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className={style["loginBtn"]}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className={style["registerBtn"]}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </motion.ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
