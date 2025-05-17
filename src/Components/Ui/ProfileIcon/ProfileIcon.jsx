import React, { useEffect, useRef, useState } from "react";
import style from "./ProfileIcon.module.css";
import { motion } from "framer-motion";
const ProfileIcon = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const [profileLinks, setProfileLinks] = useState([
    {
      icon: <i className="fa-solid fa-lg fa-home"></i>,
      to: "/Home",
      text: "Home",
    },
    {
      icon: <i className="fa-solid fa-lg fa-shop"></i>,
      to: "/products",
      text: "products",
    },
    {
      icon: <i className="fa-regular fa-lg fa-circle-user"></i>,
      to: "/profile",
      text: "My Profile",
    },
    {
      icon: <i className="fa-solid fa-sort"></i>,
      to: "/my-Orders",
      text: "My Orders",
    },
    {
      icon: <i className="fa-solid fa-lg fa-screwdriver-wrench"></i>,
      to: "/my-Repair-requests",
      text: "My Repair Requests",
    }
  ]);
  const containerRef = useRef();
  // Toggle filter modal for mobile
  const toggleNavbarModal = () => {
    setShowSubMenu(!showSubMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showSubMenu &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      )
        setShowSubMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <>
      <div
        className={
          style.ProfileIconContainer +
          " position-fixed  d-flex  justify-content-center align-items-center mb-3 me-3 end-0 "
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className={
            style.ProfileIcon +
            " rounded-circle shadow d-flex justify-content-center"
          }
          onClick={toggleNavbarModal}
        >
          <i className="fa-solid fa-user fa-2x m-2"></i>
        </motion.div>
      </div>
      {showSubMenu && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
          className={style.navbarModalContainer}
          ref={containerRef}
        >
          <button
            className="btn btn-outline-danger rounded-5 fs-5 fw-bolder position-absolute top-0 end-0 me-2 mt-2 d-flex justify-content-center align-items-center"
            onClick={toggleNavbarModal}
            style={{
              width: "30px",
              height: "30px",
            }}
          >
            X
          </button>
          <div className="d-flex flex-column justify-content-center align-items-center gap-3">
            {profileLinks.map((link, idx) => (
              <a
                href={link.to}
                key={idx}
                className={
                  style.navbarModalItem +
                  " d-flex justify-content-between align-items-center gap-2 w-100 p-2 rounded-5"
                }
              >
                <span>{link.text}</span>
                {link.icon}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ProfileIcon;
