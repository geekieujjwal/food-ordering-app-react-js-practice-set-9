import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
