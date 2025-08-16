import React from "react";
import Banner from "./Banner";
import Featured from "./Featured";
import FAQ from "./FAQ";
import About from "./About";
import Contact from "./Contact";
import DashboardCount from "./DashboardCount";
import Reviews from "./Review";
import Subscribe from "./Subscribe";
import Service from "./Service";

const Home = () => {
  return (
    <div>
      <div>
        <Banner />
        <Featured />
        <FAQ />
        <About />
        <Contact />
        <DashboardCount />
        <Reviews/>
        <Service/>
        <Subscribe/>

      </div>
    </div>
  );
};

export default Home;
