import { Theme } from "../theme";
import { Navbar } from "../navbar";
import { LanguageSelector } from "../languageSelector/";
import "./header.css";
import logo from "../../assets/images/logo.svg";

export function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="main-header">
          <img src={logo} alt="Poke Ball" className="header-logo" />
          <h1 className="header-title">Poke Guide</h1>
        </div>
        <Navbar />
      </div>

      <div className="header-right">
        <div className="header-actions">
          <Theme />
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
