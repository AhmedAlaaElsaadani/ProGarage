import React from "react";
import ErrorImage from "../../assets/animations/Error.json";
import Lottie from "lottie-react";
import style from "./Error404.module.css";
import { Link } from "react-router-dom";
export default function Error404() {
  return (
    <main className={style.mainContainer}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 align-self-center">
            <Lottie animationData={ErrorImage} className="w-100 " />
          </div>
          <div className="col-md-6 align-self-center p-5 ">
            <h2>UH OH! You're lost.</h2>
            <p>

              Sorry, we can't find the page you're looking for. You can go back to the homepage

            </p>
            <Link to={"./"} className={style.Link}>Home</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
