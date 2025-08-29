import React, { useState } from 'react';
import './Home.css';
import MobileAppDownload from '../../components/MobileAppDownload/MobileAppDownload';
import AboutInformation from '../../components/AboutInformation/AboutInformation';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Footer from '../../components/Footer/Footer'; // <-- import Footer

const Home = () => {
  const [category, setCategory] = useState("All"); // Default to show all

  return (
    <div>
      {/* Menu Section */}
      <section id="Menu">
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
      </section>

      

      {/* About Section */}
      <section id="About-Information">
        <AboutInformation />
      </section>

      <hr />

      {/* Mobile App Section */}
      <section id="Mobile-app-download">
        <MobileAppDownload />
      </section>

      <hr />

      
    </div>
  );
};

export default Home;

