import "./style.css";

const LanguageSwitcher = ({ currentLanguage, onLanguageChange }) => {
  const languages = [
    { code: "fr", name: "Français" },
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "de", name: "Deutsch" },
    { code: "it", name: "Italiano" },
    { code: "ja", name: "日本語" },
    { code: "pt", name: "Português" },
    { code: "zh", name: "中文" },
  ];

  return (
    <div className="language-switcher">
      <label htmlFor="language-select">Language:</label>
      <select
        id="language-select"
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="language-select"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
