import { useTranslation } from "react-i18next";
import { useState } from "react";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || i18n.language,
  );

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    localStorage.setItem("language", lang);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-lg bg-gray-700 px-4 py-2 text-white focus:outline-none"
      >
        {language === "en" ? "English" : "Georgian"}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={() => changeLanguage("en")}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              English
            </button>
            <button
              onClick={() => changeLanguage("ge")}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Georgian
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
