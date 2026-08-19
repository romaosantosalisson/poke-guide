import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

export function Navbar() {
  const location = useLocation();

  const menuItems = [
    { id: "/", label: "Início" },
    { id: "/nome", label: "Buscar por nome" },
    { id: "/tipo", label: "Buscar por Tipo" },
    { id: "/habilidade", label: "Buscar por Habilidade" },
  ];

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {menuItems.map((item) => (
          <li key={item.id} className="navbar-item">
            <Link
              to={item.id}
              className={`navbar-button ${location.pathname === item.id ? "active" : ""}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
