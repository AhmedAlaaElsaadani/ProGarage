import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IsMobileContext } from "../../Context/isMobileContext";
import style from "./MobileNav.module.css";
import logo from "../../assets/Images/logo.svg";
import { HashLink } from "react-router-hash-link";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import i18n from "../../i18n";
import NavbarTop from "../Ui/NavbarTop/NavbarTop";
import SubMenuNavbar from "../Ui/SubMenuNavbar/SubMenuNavbar";
import { basketContext } from "../../Context/basketContext";
const MobileNav = () => {
  const { t } = useTranslation();
  const { isMobile } = useContext(IsMobileContext);
  const { basket } = useContext(basketContext);
  const [activeItem, setActiveItem] = useState("home");
  const [toggleMenu, setToggleMenu] = useState(false);
  const links = [
    {
      link: t("nav_link_Home"),
      active: "home",
      to: "/home",
    },
    {
      link: t("nav_link_courses"),
      active: "courses",
      to: "/courses",
    },
    {
      link: t("nav_link_study"),
      active: "study",
      to: "study",
    },
    {
      link: t("nav_link_teachers"),
      active: "teachers",
      to: "/teachers",
    },
    {
      link: t("nav_link_books"),
      active: "books",
      to: "/books",
    },
    {
      link: t("nav_link_articles"),
      active: "articles",
      to: "/articles",
    },
    {
      link: t("nav_link_jobs"),
      active: "jobs",
      to: "/jobs",
    },
  ];

  const toggleLanguage = async () => {
    let languageFlag = i18n.language == "en";
    languageFlag
      ? await i18n.changeLanguage("ar")
      : await i18n.changeLanguage("en");
    window.location.reload();

    // if (languageFlag) {
    //   document.body.style.direction = "rtl";
    //   // document.title = "منصة حصون التعليمبة";
    // } else {
    //   document.body.style.direction = "ltr";
    //   // document.title = "Hoson Education Platform";
    // }
  };

  const navBar = useRef(null);
  const navBarTop = useRef(null);
  useEffect(() => {
    // Add padding to the body to prevent the content from being hidden behind the navbar when the page is scrolled
    if (isMobile) {
      document.body.style.paddingBottom = `${navBar.current.clientHeight}px`;
      document.body.style.paddingTop = `${navBarTop.current.clientHeight}px`;
    } else {
      document.body.style.paddingBottom = "0px";
      document.body.style.paddingTop = "0px";
    }
    return () => {
      document.body.style.paddingBottom = "0px";
      document.body.style.paddingTop = "0px";
    };
  }, []);

  const handleClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <div>
      <div className={`${style.navtop} shadow `} ref={navBarTop}>
        <NavbarTop />
        <div className="container d-flex justify-content-between align-items-center py-2">
          <HashLink className="navbar-brand" to="/">
            <motion.img
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              src={logo}
              className={`${style.logo} `}
              alt="logo website"
            />
          </HashLink>

          <motion.ul
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="navbar-nav d-flex flex-row gap-2 align-items-center m-0"
          >
            <li className={style.cart}>
              <Link to="/cart">
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
              <span className={style.cartCount}>
                {basket ? basket.items.length : 0}
              </span>
            </li>
            <SubMenuNavbar />
            <li>
              <button
                className={`${style.langButton}`}
                onClick={toggleLanguage}
              >
                {t("Language_nav")}
              </button>
            </li>
          </motion.ul>
        </div>
      </div>
      <div
        dir="ltr"
        className={`${style.navbottom} fixed-bottom w-100 `}
        ref={navBar}
      >
        <div className={`${style.navigation}`}>
          <ul>
            <li
              className={`${style.list} ${
                activeItem === "settings" ||
                activeItem === "jobs" ||
                activeItem === "articles" ||
                activeItem === "teachers"
                  ? style.active
                  : ""
              }`}
              onClick={() => {
                handleClick("settings");
                setToggleMenu(!toggleMenu);
              }}
            >
              <Link>
                <span className={style.icon}>
                  <i className="fa-solid fa-bars"></i>
                </span>
                <span className={style.text}>{t("mobile_menue")} </span>
              </Link>
            </li>
            <li
              className={`${style.list} ${
                activeItem === "books" ? style.active : ""
              }`}
              onClick={() => handleClick("books")}
            >
              <Link to="/books">
                <span className={style.icon}>
                  <i className="fa-solid fa-book"></i>
                </span>
                <span className={style.text}>{t("mobile_books")} </span>
              </Link>
            </li>
            <li
              className={`${style.list} ${
                activeItem === "study" ? style.active : ""
              }`}
              onClick={() => handleClick("study")}
            >
              <Link to="/study">
                <span className={style.icon}>
                  <i className="fa-solid fa-person-chalkboard"></i>
                </span>
                <span className={style.text}>{t("mobile_lessons")} </span>
              </Link>
            </li>
            <li
              className={`${style.list} ${
                activeItem === "courses" ? style.active : ""
              }`}
              onClick={() => handleClick("courses")}
            >
              <Link to="/courses">
                <span className={style.icon}>
                  <i className="fa-solid fa-chalkboard"></i>
                </span>
                <span className={style.text}>{t("mobile_Courses")} </span>
              </Link>
            </li>
            <li
              className={`${style.list} ${
                activeItem === "home" ? style.active : ""
              }`}
              onClick={() => handleClick("home")}
            >
              <Link to="/home">
                <span className={style.icon}>
                  <i className="fa-solid fa-house"></i>
                </span>
                <span className={style.text}>{t("mobile_Main")} </span>
              </Link>
            </li>
            <div className={style.indicator}></div>
          </ul>
        </div>
      </div>

      <div className={`${style.sidebar} ${toggleMenu ? style.active : ""}`}>
        <div className={style.sidebarHeader}>
          <h3 className={`${style.headmenue}`}>{t("mobile_menue")}</h3>
          <button
            className={style.closeBtn}
            onClick={() => setToggleMenu(false)}
          >
            <i className="fa-solid fa-times"></i>
          </button>
        </div>
        <ul className={style.menuList}>
          {links.map((item, index) => (
            <li key={index} className={style.menuItem}>
              <Link
                to={item.to}
                className={`${style.menuLink} ${
                  activeItem === item.active ? style.active : ""
                }`}
                onClick={() => {
                  handleClick(item.active);
                  setToggleMenu(false);
                }}
              >
                {item.link}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Add overlay when sidebar is open */}
      {toggleMenu && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
          onClick={() => setToggleMenu(false)}
        />
      )}
    </div>
  );
};

export default MobileNav;
