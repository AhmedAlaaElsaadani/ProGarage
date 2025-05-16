import React from "react";
import AskForRepair from "../../Components/AskForRepair/AskForRepair";
import HomeScrollBar from "../HomeScrollBar/HomeScrollBar";

export default function Home() {
  return <section id="Home" >


    {/* <Hero/> */}
    {/* <OurServices/> */}
    <HomeScrollBar/>
    <AskForRepair/>

  </section>;
}
