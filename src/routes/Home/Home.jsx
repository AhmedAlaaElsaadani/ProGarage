import React, { useContext } from "react";
import AskForRepair from "../../Components/AskForRepair/AskForRepair";
import HomeScrollBar from "../../Components/HomeScrollBar/HomeScrollBar";
import OurServices from "../../Components/OurServices/OurServices";
import Spinner from "../../Components/Ui/Spinner/Spinner";
import { HomeContentContext } from "../../contexts/homeContentContext";

export default function Home() {
  const { isLoading, homeContent } = useContext(HomeContentContext);

  return (
    <section id="Home">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {/* <Hero/> */}
          <OurServices  servicesData={homeContent.services} />
          <HomeScrollBar categories={homeContent.productCategories} />
          <AskForRepair />
        </>
      )}
    </section>
  );
}
