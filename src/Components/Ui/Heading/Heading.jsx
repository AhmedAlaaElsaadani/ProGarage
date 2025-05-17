import React from "react";
import backgroundHeading from "../../../assets/Images/backgroundHeading.jpg";

export default function Heading({ heading }) {
  return (
    <div
      className="heading d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${backgroundHeading})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "300px",
      }}
    >
        <h1 className="text-white text-center">{heading}</h1>
    </div>
  );
}
