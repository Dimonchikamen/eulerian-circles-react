import React from "react";
import s from "./Navbar.module.css";
import { BrowserRouter, Link } from "react-router-dom";

const Navbar = ({ switchTheme, theme }: any) => {
  return (
    <div className={s.navbar}>
      <ul className={s.links}>
        <Link to="/euler_circle" className={s.navLink}>
          Эйлеровые круги
        </Link>
        <Link to="/logical_solver" className={s.navLink}>
          Логический решатель
        </Link>
        <div>dark mode</div>
        <label className={s.switch}>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onClick={() => switchTheme(theme)}
          />
          <span className={`${s.slider} ${s.round}`}></span>
        </label>
      </ul>
    </div>
  );
};

export default Navbar;
