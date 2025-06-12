import { useContext, useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import style from "./MobileNav.module.css";

import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { HashLink } from "react-router-hash-link";
import { authContext } from "../../../Contexts/authContext";
import ApiManager from "../../../Utilies/ApiManager";
import { IsMobileContext } from "../../../Contexts/IsMobileContext";

const MobileNav = () => {
  const [active, setActive] = useState("Home");
  const [isOpenSide, setIsOpenSide] = useState(false);
  const location = useLocation();
  let { isRegistered } = useContext(authContext);
  const { isMobile } = useContext(IsMobileContext);

  const navBar = useRef(null);
  const navBarTop = useRef(null);

  const links = [
    {
      icon: <i className="fa-solid fa-house"></i>,
      link: "Home",
      active: "Home",
      to: "./#Home",
    },
    {
      icon: <i className="fa-solid fa-circle-info"></i>,
      link: "About",
      active: "About",
      to: "About#About",
    },
    {
      icon: <i className="fa-solid fa-bars-progress"></i>,
      link: "products",
      active: "Products",
      to: "products#Packages",
    },
    {
      icon: <i className="fa-solid fa-envelope"></i>,
      link: "Contact",
      active: "Contact",
      to: "Contact#Contact",
    },
  ];


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

  const linksLoginRegister = [
    {
      link: "Login",
      active: "Login",
      to: "/Login",
    },
    {
      link: "Register",
      active: "Register",
      to: "/Register",
    },
  ];
  var toggleAside = () => {
    setIsOpenSide(!isOpenSide);
  };

  useEffect(() => {
    // Add padding to the body to prevent the content from being hidden behind the navbar when the page is scrolled
    const rootElement = document.getElementById("root");

    if (isMobile && navBar.current && navBarTop.current) {
      rootElement.style.paddingBottom = `${navBar.current.clientHeight}px`;
      rootElement.style.paddingTop = `${navBarTop.current.clientHeight}px`;
    } else {
      rootElement.style.paddingBottom = "0px";
      rootElement.style.paddingTop = "0px";
    }
    return () => {
      rootElement.style.paddingBottom = "0px";
      rootElement.style.paddingTop = "0px";
    };
  }, [navBarTop.current, navBar.current]);

  return (
    <>
      <div className="position-fixed top-0 start-0 end-0 z-3" ref={navBarTop}>
        <div className="" style={{ height: "10px", backgroundColor: "var(--prim-color)" }}></div>
      </div>

      <div className={`${style.mobile}`}>
        <div className="floated ">
          {!isRegistered && <div className={`${style.fixedButton} position-fixed`}>
            <button
              className="btn position-relative btn-danger rounded-circle p-3"
              onClick={toggleAside}
              aria-label={isRegistered ? "User Menu" : "Navigation Menu"}
            >
              <i className="fa-solid fa-bars"></i>

            </button>
          </div>}
          {isOpenSide && (
            <aside className={`${style.full_screen} position-fixed`}>
              <div className={`${`aside_content`} w-100 position-relative p-4`}>
                <div className="sideTop mb-4 ">
                  <button
                    className={`${`close_aside`} btn btn-danger position-absolute top-0 right-0 m-3 `}
                    onClick={toggleAside}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
                <div className="navlist">
                  <motion.ul
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4 d-flex flex-column  align-items-center justify-content-center "
                    style={{ minHeight: "70vh" }}
                  >{(
                    linksLoginRegister.map((link, idx) => (
                      <li
                        onClick={() =>
                          isOpenSide ? setIsOpenSide(false) : isOpenSide
                        }
                        key={idx}
                        className=" "
                      >
                        <HashLink className={``} to={link.to}>
                          {link.link}
                        </HashLink>
                      </li>
                    ))
                  )}

                  </motion.ul>
                </div>
              </div>
            </aside>
          )}
        </div>

        <nav
          className={`navbar lead navbar-expand-lg shadow  fixed-bottom pb-5  ${style.navbar}`}
          data-bs-theme={"dark"}
          ref={navBar}
        >
          <div className="container">
            <div
              className={`row w-100  ${style["list-links"]} justify-content-between text-center`}
            >
              {links.map((link, index) => (
                <div key={index} className="col">
                  <Link
                    to={link.to}
                    onClick={() =>
                      isOpenSide ? setIsOpenSide(false) : isOpenSide
                    }
                    className={`nav-link ${link.active == active ? style["selected"] : ""
                      } d-flex flex-column align-items-center`}
                  >
                    {link.icon}
                    <span>{link.link}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileNav;
