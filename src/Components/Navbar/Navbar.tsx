import s from "./Navbar.module.css";
import menu_img from "../../static/images/menu.svg";
import close from "../../static/images/close.svg";
import rightArrow from "../../static/images/rightArrow.svg";
import { useCallback, useContext, useState } from "react";
import { TabContext } from "providers/TabProvider/TabContext";

const Navbar = ({ switchTheme, theme }: any) => {
    const [showMobileNav, setShowMobileNav] = useState(false);
    const { setTab } = useContext(TabContext);

    const changeTab = useCallback((tab: number) => {
        return () => setTab(tab);
    }, [setTab]);

    const mobileClickHandler = useCallback((tab: number) => {
        return () => {
            setTab(tab)
            setShowMobileNav(false);
        }
    },[]);

    return (
        <>
            <div className={s.navbar}>
                <ul className={s.links}>
                    <div className={s.navLink} onClick={changeTab(0)}>
                        Эйлеровые круги
                    </div>
                    <div className={s.navLink} onClick={changeTab(1)}>
                        Логический решатель
                    </div>
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
                                <div
                                    className={s.mobile_link}
                                    onClick={mobileClickHandler(0)}
                                >
                                    Эйлеровые круги
                                    <div className={s.right_arrow}>
                                        <img
                                            src={rightArrow}
                                            alt=""
                                            className={s.right_arrow_svg}
                                        />
                                    </div>
                                </div>
                                <div
                                    className={s.mobile_link}
                                    onClick={mobileClickHandler(1)}
                                >
                                    Логический решатель
                                    <div className={s.right_arrow}>
                                        <img
                                            src={rightArrow}
                                            alt=""
                                            className={s.right_arrow_svg}
                                        />
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
