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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          euismod, nisl at facilisis hendrerit, arcu sapien ullamcorper orci,
          non gravida tortor nibh non lorem. Integer non felis nec justo
          vulputate tristique. Proin interdum, metus vel bibendum blandit, justo
          lorem egestas velit, vel consectetur arcu ex vitae ipsum. Suspendisse
          potenti. Fusce eget tincidunt nunc. Curabitur ac nisl sit amet nisi
          vehicula finibus. Nulla facilisi. Donec vestibulum, libero vel
          fringilla iaculis, nibh sem convallis metus, non ultricies lorem
          tortor nec tortor.
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          euismod, nisl at facilisis hendrerit, arcu sapien ullamcorper orci,
          non gravida tortor nibh non lorem. Integer non felis nec justo
          vulputate tristique. Proin interdum, metus vel bibendum blandit, justo
          lorem egestas velit, vel consectetur arcu ex vitae ipsum. Suspendisse
          potenti. Fusce eget tincidunt nunc. Curabitur ac nisl sit amet nisi
          vehicula finibus. Nulla facilisi. Donec vestibulum, libero vel
          fringilla iaculis, nibh sem convallis metus, non ultricies lorem
          tortor nec tortor.
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
            <span>Lorem ipsum dolor sit amet:</span> consectetur adipiscing
            elit. Pellentesque euismod, nisl at facilisis hendrerit, arcu sapien{" "}
          </li>
          <li>
            <span>Lorem ipsum dolor sit amet:</span> consectetur adipiscing
            elit. Pellentesque euismod, nisl at facilisis hendrerit, arcu sapien{" "}
          </li>
          <li>
            <span>Lorem ipsum dolor sit amet:</span> consectetur adipiscing
            elit. Pellentesque euismod, nisl at facilisis hendrerit, arcu sapien{" "}
          </li>
          <li>
            <span>Lorem ipsum dolor sit amet:</span> consectetur adipiscing
            elit. Pellentesque euismod, nisl at facilisis hendrerit, arcu sapien{" "}
          </li>
          <li>
            <span>Lorem ipsum dolor sit amet:</span> consectetur adipiscing
            elit. Pellentesque euismod, nisl at facilisis hendrerit, arcu sapien{" "}
          </li>
        </ul>
      </motion.div>
    </section>
  );
}
