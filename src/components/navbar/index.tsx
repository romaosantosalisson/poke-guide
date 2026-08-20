import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./navbar.css";

export function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: "/", label: t("home") },
    { path: "/search-name", label: t("searchByName") },
    { path: "/search-type", label: t("searchByType") },
    { path: "/search-ability", label: t("searchByAbility") },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
        {isOpen ? "✕" : "☰"}
      </button>
      <ul className={`navbar-list ${isOpen ? "open" : ""}`}>
        {menuItems.map((item) => (
          <li key={item.path} className="navbar-item">
            <NavLink
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) => `navbar-button ${isActive ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
