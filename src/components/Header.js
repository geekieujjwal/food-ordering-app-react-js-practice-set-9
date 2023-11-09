import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ContextProvider } from "../contexts/FoodContext";

const Header = () => {
  const { cart } = useContext(ContextProvider);

  const getActive = ({ isActive }) =>
    isActive
      ? {
          color: "red",
          fontWeight: "700",
          fontSize: "20px",
        }
      : {};

  return (
    <div>
      <div className="nav-links">
        <NavLink to="/" style={getActive} className="header-link">
          Home
        </NavLink>
        <NavLink to="/menu" style={getActive} className="header-link">
          Menu
        </NavLink>
        <div>
          <NavLink to="/cart" style={getActive} className="header-link">
            Cart
          </NavLink>
          {cart.length ? ` (${cart.length})` : ""}
        </div>
      </div>
      <h1>Welcome to my Food Ordering App</h1>
    </div>
  );
};

export default Header;
