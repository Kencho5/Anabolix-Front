import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export const Dropdown = () => {
  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const options = ["Option 1", "Option 2", "Option 3"];

  return (
    <div className="relative mb-2 w-64 select-none">
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected || "Select an option"}</span>
        <FaChevronDown />
      </div>

      {isOpen && (
        <ul className="absolute z-10 mt-2 max-h-48 w-full overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
