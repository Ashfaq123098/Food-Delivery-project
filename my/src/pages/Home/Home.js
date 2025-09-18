import React from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import "./Home.css";
export const Home = ({ category, setCategory, user }) => {
  return (
    <div>
      <Header />

      {user && (
        <div className="home-user-profile">
          <img src={user.avatar} alt="profile" className="home-user-avatar" />
          <h3>Welcome, {user.name}</h3>
        </div>
      )}

      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
};
