import React from "react";
import { NavLink } from "react-router-dom";
import close from "../../images/close.png"
import "./Menu.css";

const Menu = () => {
  const closeNav = () => {
    document.getElementById("menu").style.width = "0";
  };

  return (
   <section>
      <div id="menu" className="menu">
        <div className="menu__lm">
        <p className="menu__logo">Evelop</p>
          <img src={close} alt="Закрыть меню" className="menu__close" onClick={() => closeNav()}/>
        </div>
        <NavLink to="/">dashboard</NavLink>
       <NavLink to="/content">content</NavLink>
        </div>
   </section>
  );
};

export default Menu;