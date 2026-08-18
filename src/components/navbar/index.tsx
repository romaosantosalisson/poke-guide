import { useState } from "react";
import "./navbar.css";

interface NavbarProps {
  onTabChange?: (tab: string) => void;
  activeTab?: string;
}

export function Navbar({ onTabChange, activeTab }: NavbarProps) {
  const [internalActive, setInternalActive] = useState("inicio");
  const active = activeTab ?? internalActive;

  const menuItems = [
    { id: "inicio", label: "Início" },
    { id: "nome", label: "Buscar por nome" },
    { id: "tipo", label: "Buscar por Tipo" },
    { id: "habilidade", label: "Buscar por Habilidade" },
  ];

  const handleTabClick = (id: string) => {
    setInternalActive(id);
    if (onTabChange) {
      onTabChange(id);
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {menuItems.map((item) => (
          <li key={item.id} className="navbar-item">
            <button
              type="button"
              onClick={() => handleTabClick(item.id)}
              className={`navbar-button ${active === item.id ? "active" : ""}`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
