import { useTranslation } from "react-i18next";
import "./language-selector.css";

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const languages = [
    { code: "pt-BR", flag: "🇧🇷", label: "PT-BR" },
    { code: "en-US", flag: "🇬🇧", label: "English" },
    { code: "es-ES", flag: "🇪🇸", label: "Español" },
  ];

  return (
    <div className="language-selector">
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`lang-button ${i18n.language === lang.code ? "active" : ""}`}
          onClick={() => i18n.changeLanguage(lang.code)}
        >
          <span>{lang.flag}</span>
          {lang.label}
        </button>
      ))}
    </div>
  );
}
