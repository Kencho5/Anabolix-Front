import { useState, useMemo } from "react";
import { LuChevronsUpDown } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import OutsideClickHandler from "../utils/OutsideClick";

export function Combobox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");

  const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
  ];

  const filteredFrameworks = useMemo(
    () =>
      frameworks.filter((framework) =>
        framework.label.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
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
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <LuChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </button>
        {open && (
          <div className="absolute z-10 mt-2 w-full rounded-lg border border-stone-300 bg-white shadow-lg">
            <div className="flex items-center border-b border-stone-300">
              <FiSearch className="ml-3 h-5 w-5 text-stone-500" />
              <input
                autoFocus
                type="text"
                placeholder="Search framework..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-t-md px-3 py-2 pl-2 outline-none"
              />
            </div>
            <div className="max-h-60 overflow-y-auto p-2">
              {filteredFrameworks.length === 0 ? (
                <div className="p-3 text-center">No framework found.</div>
              ) : (
                filteredFrameworks.map((framework) => (
                  <button
                    key={framework.value}
                    className={`mx-auto flex w-full items-center rounded-md px-2 py-2 text-center transition-colors hover:bg-stone-100 ${value === framework.value ? "bg-stone-100" : ""}`}
                    onClick={() => {
                      setValue(
                        value === framework.value ? "" : framework.value,
                      );
                      setOpen(false);
                    }}
                  >
                    {value === framework.value && (
                      <FaCheck className="mr-2 h-4 w-4 opacity-100" />
                    )}
                    {value !== framework.value && (
                      <span className="mr-2 h-4 w-4 opacity-0" />
                    )}
                    {framework.label}
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
