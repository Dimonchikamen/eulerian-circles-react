import s from "./Navbar.module.css";
import { Link } from "react-router-dom";
import menu_img from "../../static/images/menu.svg";
import close from "../../static/images/close.svg";
import rightArrow from "../../static/images/rightArrow.svg";
import { useState } from "react";

const Navbar = ({ switchTheme, theme }: any) => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
    <>
      <div className={s.navbar}>
        <ul className={s.links}>
          <Link to="/Eulerian_Circles" className={s.navLink}>
            Эйлеровые круги
          </Link>
          <Link to="/Logical_Solver" className={s.navLink}>
            Логический решатель
          </Link>
          <div className={s.mobile_menu} onClick={() => setShowMobileNav(true)}>
            <img src={menu_img} alt="" />
          </div>
          <div className={s.dark_mode_container}>
            <div className={s.dark_mode}>dark mode</div>
            <label className={s.switch}>
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={() => switchTheme(theme)}
              />
              <span className={`${s.slider} ${s.round}`}></span>
            </label>
          </div>
        </ul>
      </div>
      {showMobileNav && (
        <div className={s.mobile_nav_container}>
          <div className={s.mobile_nav}>
            <div className={s.left_side_mobile}></div>
            <div className={s.right_side}>
              <div className={s.close} onClick={() => setShowMobileNav(false)}>
                <img src={close} alt="" className={s.right_arrow_svg} />
              </div>
              <ul className={s.mobile_links}>
                <Link
                  to="/Eulerian_Circles"
                  className={s.mobile_link}
                  onClick={() => setShowMobileNav(false)}
                >
                  Эйлеровые круги
                  <div className={s.right_arrow}>
                    <img
                      src={rightArrow}
                      alt=""
                      className={s.right_arrow_svg}
                    />
                  </div>
                </Link>
                <Link
                  to="/Logical_Solver"
                  className={s.mobile_link}
                  onClick={() => setShowMobileNav(false)}
                >
                  Логический решатель
                  <div className={s.right_arrow}>
                    <img
                      src={rightArrow}
                      alt=""
                      className={s.right_arrow_svg}
                    />
                  </div>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
