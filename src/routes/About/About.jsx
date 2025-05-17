import React from "react";
import style from "./About.module.css";
import img from "../../assets/Images/About.png";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="About" className={"container " + style.about}>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={style["imageContainer"]}
      >
        <img src={img} className="w-100 object-fit-cover" alt="About" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={style["textContainer"]}
      >
        <h2 className={style.heading}>Who is Pro Garage?</h2>
        <p>
          ProGarage is a comprehensive automotive service website designed to
          meet the needs of car owners and enthusiasts alike. It features a
          well-organized online store offering a wide range of car parts for
          various makes and models, making it easy for customers to find the
          components they need. Whether you're looking for engine parts, brakes,
          filters, or accessories, ProGarage provides quality products at
          competitive prices. The user-friendly interface and secure checkout
          process ensure a smooth shopping experience for clients who prefer to
          maintain or upgrade their vehicles themselves.
          <br />
          <br />
          In addition to selling car parts, ProGarage also offers professional
          car repair services for those who prefer expert assistance. Customers
          can schedule appointments online and choose from a range of
          maintenance and repair options, all carried out by experienced
          mechanics. This dual offering—both parts and repair—makes ProGarage a
          convenient, one-stop solution for automotive care. Whether you're a
          DIY car owner or someone who wants a trusted professional to handle
          repairs, ProGarage caters to all needs with efficiency and
          reliability.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className={style["textContainer"]}
      >
        <h2 className={style.heading}>Who Choose Pro Garage?</h2>
        <ul>
          <li>
            <span>Car owners looking for quality auto parts</span> – People who
            prefer to buy reliable car components online at competitive prices.
          </li>
          <li>
            <span>DIY enthusiasts and home mechanics</span> – Individuals who
            enjoy working on their own vehicles and need access to a wide range
            of parts.
          </li>
          <li>
            <span>Busy customers seeking convenient repair services</span> –
            Those who want to book car maintenance or repairs online with
            trusted professionals.
          </li>
          <li>
            <span>People who want a one-stop solution</span> – Customers looking
            for both car parts and repair services in one place.
          </li>
          <li>
            <span>Vehicle owners seeking expert advice</span> – Clients who may
            need guidance on the right parts or repair options for their car.
          </li>
          <li>
            <span>Cost-conscious drivers</span> – People who want affordable
            prices without compromising on quality.
          </li>
          <li>
            <span>Fleet managers or small business owners</span> – Businesses
            that need regular access to parts and repair services for their
            vehicles.
          </li>
        </ul>
      </motion.div>
    </section>
  );
}
