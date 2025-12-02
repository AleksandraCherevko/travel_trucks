import Link from "next/link";
import css from "./Header.module.css";
import Container from "../Container/Container";

const Header = () => {
  return (
    <header className={css.header}>
      <Container>
        <div className={css.headerContainer}>
          <Link href="/">
            <svg width="138" height="16" className={css.logo}>
              <use href="/symbol-defs.svg#icon-main_logo"></use>
            </svg>
          </Link>

          <nav className={css.headerNav} aria-label="Web navigation">
            <ul className={css.headerNavList}>
              <li className={css.headerNavItem}>
                <Link className={css.headerNavLink} href="/">
                  Home
                </Link>
              </li>
              <li className={css.headerNavItem}>
                <Link className={css.headerNavLink} href="/catalog">
                  Catalog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
