import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import menu from "../../images/menu.png";
import "./Header.css";
import Menu from "../Menu/Menu";

const Header = () => {
  const nameFull = useSelector((state) => state.user.currentUser.name);
  const name = nameFull[0];
  const avatar = useSelector((state) => state.user.currentUser.avatar);

  const color = [
    "#fc5eff",
    "#ff2965",
    "#ffb326",
    "#ADFF2F",
    "#40E0D0",
    "#1E90FF",
    "#ffff29",
    "#ff305a",
  ];

  const colorValue = color[avatar];

  const openNav = () => {
    document.getElementById("menu").style.width = "260px";
  };

  return (
    <section>
      <article className="header">
        <div className="header__lm">
          <img
            src={menu}
            alt="Меню"
            className="header__menu_img"
            onClick={() => openNav()}
          />
          <p className="header__logo">Evelop</p>
        </div>
        <div className="header_rels">
          <NavLink to="/profile" className="header__rel">
            <div
              className="header__avatar_background"
              style={{ backgroundColor: colorValue }}
            >
              <div className="header__avatar">{name.toUpperCase()}</div>
            </div>
          </NavLink>
        </div>
      </article>
      <Menu />
    </section>
  );
};

export default Header;
