import React, { useContext } from "react";
import AskForRepair from "../../Components/AskForRepair/AskForRepair";
import HomeScrollBar from "../../Components/HomeScrollBar/HomeScrollBar";
import OurServices from "../../Components/OurServices/OurServices";
import Spinner from "../../Components/Ui/Spinner/Spinner";
import { HomeContentContext } from "../../Contexts/homeContentContext.jsx";
import Hero from "../../Components/Hero/Hero.jsx";

export default function Home() {
  const { isLoading, homeContent } = useContext(HomeContentContext);

  return (
    <section id="Home">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
        {/* still working */}
          <Hero products={homeContent.products} /> 
          <OurServices servicesData={homeContent.services} />
          <HomeScrollBar categories={homeContent.productCategories} />
          <AskForRepair />
        </>
      )}
    </section>
  );
}
