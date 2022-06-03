import s from "./Navbar.module.css";
import { Link } from "react-router-dom";

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
        <div className={s.dark_mode}>dark mode</div>
        <label className={s.switch}>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={() => switchTheme(theme)}
          />
          <span className={`${s.slider} ${s.round}`}></span>
        </label>
      </ul>
    </div>
  );
};

export default Navbar;
