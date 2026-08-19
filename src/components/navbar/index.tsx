import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./navbar.css";

export function Navbar() {
  const { t } = useTranslation();

  const menuItems = [
    { path: "/", label: t("home") },
    { path: "/search-name", label: t("searchByName") },
    { path: "/search-type", label: t("searchByType") },
    { path: "/search-ability", label: t("searchByAbility") },
  ];

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {menuItems.map((item) => (
          <li key={item.path} className="navbar-item">
            <NavLink
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) => `navbar-button ${isActive ? "active" : ""}`}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
