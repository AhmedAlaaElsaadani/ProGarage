import Lottie from "lottie-react";
import React from "react";
import AskForRepairAnimation from "../../assets/animations/AskForRepair.json";
import contactImage from "../../assets/Images/contactImage.png";
import style from "./AskForRepair.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export default function AskForRepair() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={"container p-3 " + style.AskForRepair}
    >
      <h2>Need a Quick Fix for Your Vehicle?</h2>
      <div className="row">
        <motion.div
          initial={{
            opacity: 0,
            x: -100,
          }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="col-md-7"
        >
          <Lottie animationData={AskForRepairAnimation} loop={true} />
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            x: 100,
          }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="col-md-5 d-flex flex-column justify-content-center"
        >
          <div className="w-100 text-center">
            <img src={contactImage} alt="contactImage" />
          </div>
          <Link
            to="/repairRequest"
            className="btn-web btn-web-primary mt-3 text-center rounded-4 py-3"
          >
            Book a Repair Now
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
