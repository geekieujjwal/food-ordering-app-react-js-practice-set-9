import React from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";

const HomePage = () => {
  return (
    <div>
      <Header />
      <NavLink to="/menu">
        <button>Click on me to see the menu</button>
      </NavLink>
    </div>
  );
};

export default HomePage;
