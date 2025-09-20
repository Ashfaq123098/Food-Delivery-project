import React from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AboutInformation from "../../components/AboutInformation/AboutInformation";
import MobileApp from "../../components/MobileAppDownload/MobileAppDownload";
import Footer from "../../components/Footer/Footer";
import "./Home.css";

export const Home = ({ category, setCategory }) => {
  return (
    <div className="home-page">
      <Header />

      <main className="home-content">
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
        
      </main>

    
    </div>
  );
};
