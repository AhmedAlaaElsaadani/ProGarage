import React from "react";
import style from "./WhatsappComponent.module.css";
import { motion } from "framer-motion";
const WhatsappComponent = () => {
  return (
    <a
      href="https://wa.me/+201001122334"
      target="_blank"
      className={
        style.WhatsappSocial +
        " position-fixed  d-flex  justify-content-center align-items-center mb-3 me-3 end-0 "
      }
    >
      <div
        className={
          style.WhatsappText +
          " text-white mb-5 shadow rounded-5 text-center rounded-3 p-2 me-2"
        }
        style={{
          right: "100%",
          left: "auto",
        }}
      >
        <p className="m-0">
          <span className="fw-bold">Chat with us</span> on WhatsApp
          <br />
          <span className="opacity-75">Click here to chat</span>
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className={
          style.WhatsappIcon +
          " rounded-circle shadow d-flex justify-content-center text-white"
        }
      >
        <i className="fa-brands fa-2x m-2 fa-whatsapp"></i>
      </motion.div>
    </a>
  );
};

export default WhatsappComponent;
