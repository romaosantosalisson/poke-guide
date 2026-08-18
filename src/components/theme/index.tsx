import { useEffect, useState } from "react";
import "./theme.css";

export function Theme() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const theme = localStorage.getItem("theme");

    if (theme) {
      return theme === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const htmlRootElement: HTMLElement = document.documentElement;

    if (darkMode) {
      htmlRootElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      htmlRootElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <>
      <button
        className="theme-toggle"
        onClick={() => {
          setDarkMode(!darkMode);
        }}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </>
  );
}
