import React from "react";

export default function Spinner({ sectionFlag = true }) {
  //sectionFlag is a flag to determine the spinner location
  return (
    <div
      className="w-100 p-5 d-flex h-100 "
      style={{
        backgroundColor: "var(--bg-color)",
        flexGrow: sectionFlag ? "1" : "0",
      }}
    >
      <i className="fa-solid fa-spinner fa-spin fa-spin-plus m-auto fs-1 text-warning"></i>
    </div>
  );
}
