import { Theme } from "../theme";
import { Navbar } from "../navbar";
import "./header.css";
import logo from "../../assets/images/logo.svg";

export function Header() {
  return (
    <header>
      <h1>
        <img src={logo} alt="Poke Bola" />
        Poke Guide
      </h1>
      <Navbar />
      <Theme />
    </header>
  );
}