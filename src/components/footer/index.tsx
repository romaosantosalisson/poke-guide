import { useTranslation } from "react-i18next";
import "./footer.css";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="app-footer">
      <p className="footer-content">
        &copy; {new Date().getFullYear()} <strong>Poke Guide</strong> — {t("footer")}{" "}
        <strong className="footer-author">
          <a href="https://github.com/romaosantosalisson" target="_blank">Álisson</a>
        </strong>
      </p>
    </footer>
  );
}
