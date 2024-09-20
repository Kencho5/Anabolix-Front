import { useState, useMemo } from "react";
import { LuChevronsUpDown } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import OutsideClickHandler from "../utils/OutsideClick";
import { getCountries } from "../utils/countries";
import { useTranslation } from "react-i18next";

export function Combobox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");

  const { t } = useTranslation();
  const countries = useMemo(() => getCountries(t), [t]);

  const filteredcountries = useMemo(
    () =>
      countries.filter((country) =>
        country.label.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, countries],
  );

  return (
    <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
      <div className="relative mb-4 w-[256px]">
        <button
          className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 transition-colors hover:bg-gray-100"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          {value
            ? countries.find((country) => country.value === value)?.label
            : t("COMBOBOX.select")}
          <LuChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </button>
        {open && (
          <div className="absolute z-10 mt-2 w-full rounded-lg border border-stone-300 bg-white shadow-lg">
            <div className="flex items-center border-b border-stone-300">
              <FiSearch className="ml-3 h-5 w-5 text-stone-500" />
              <input
                autoFocus
                type="text"
                placeholder={t("COMBOBOX.search")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-t-md px-3 py-2 pl-2 outline-none"
              />
            </div>
            <div className="max-h-60 overflow-y-auto p-2">
              {filteredcountries.length === 0 ? (
                <div className="p-3 text-center">No country found.</div>
              ) : (
                filteredcountries.map((country) => (
                  <button
                    key={country.value}
                    className={`mx-auto flex w-full items-center rounded-md px-2 py-2 text-center transition-colors hover:bg-stone-100 ${value === country.value ? "bg-stone-100" : ""}`}
                    onClick={() => {
                      setValue(value === country.value ? "" : country.value);
                      setOpen(false);
                    }}
                  >
                    {value === country.value && (
                      <FaCheck className="mr-2 h-4 w-4 opacity-100" />
                    )}
                    {value !== country.value && (
                      <span className="mr-2 h-4 w-4 opacity-0" />
                    )}
                    {country.label}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
}
