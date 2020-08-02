import React, { useState } from "react";
import styles from "./styles.module.sass";
import logo from "static/icons/logo.svg";
import logoActive from "static/icons/logoActive.svg";
import filter from "static/icons/filter.svg";
import filterActive from "static/icons/filterActive.svg";
import menu from "static/icons/menu.svg";
import closeDark from "static/icons/close-dark.svg";
import buttons from "styles/components/buttons.module.sass";
import { useLocation, Link } from "react-router-dom";

export interface HeaderProps {
  setIsDatePickerOpen: (isOpen: boolean) => void;
  isDatePickerOpen: boolean;
}

export const Header: React.FunctionComponent<HeaderProps> = ({
  isDatePickerOpen,
  setIsDatePickerOpen,
}) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <header className={`${styles.header} ${isMenuOpen && styles.open}`}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img src={isMenuOpen ? logoActive : logo} alt="LogoBear" />
          </Link>
        </div>
        <nav
          className={`${styles.navigation}  ${
            location.pathname === "/" && styles.hide
          }`}
        >
          <ul className={styles.menuDesktop}>
            <li
              className={`${styles.item} ${
                location.pathname === "/jogs" && styles.active
              }`}
            >
              <Link to="/jogs" onClick={() => setIsMenuOpen(false)}>
                Jogs
              </Link>
            </li>
            <li
              className={`${styles.item} ${
                location.pathname === "/info" && styles.active
              }`}
            >
              <Link to="/info" onClick={() => setIsMenuOpen(false)}>
                Info
              </Link>
            </li>
            <li
              className={`${styles.item} ${
                location.pathname === "/contact-us" && styles.active
              }`}
            >
              <Link to="/contact-us" onClick={() => setIsMenuOpen(false)}>
                Contact us
              </Link>
            </li>
          </ul>
          <div className={styles.btnsContainer}>
            <button
              className={`${buttons.btnFab} ${styles.filterBtn}`}
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              title={
                isDatePickerOpen ? "Close date picker" : "Open date picker"
              }
            >
              <img
                src={isDatePickerOpen ? filterActive : filter}
                alt="Filter"
              />
            </button>
            <button
              className={`${buttons.btnFab} ${styles.menuBtn}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              title={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <img src={isMenuOpen ? closeDark : menu} alt="Menu" />
            </button>
          </div>
          <ul className={styles.menuMobile}>
            <li
              className={`${styles.item} ${
                location.pathname === "/jogs" && styles.active
              }`}
            >
              <Link to="/jogs" onClick={() => setIsMenuOpen(false)}>
                Jogs
              </Link>
            </li>
            <li
              className={`${styles.item} ${
                location.pathname === "/info" && styles.active
              }`}
            >
              <Link to="/info" onClick={() => setIsMenuOpen(false)}>
                Info
              </Link>
            </li>
            <li
              className={`${styles.item} ${
                location.pathname === "/contact-us" && styles.active
              }`}
            >
              <Link to="/contact-us" onClick={() => setIsMenuOpen(false)}>
                Contact us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
