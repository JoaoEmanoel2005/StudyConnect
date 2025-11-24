import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const delay = setTimeout(() => {
      onChange(localValue);
    }, 300);
    return () => clearTimeout(delay);
  }, [localValue]);

  return (
    <div className="w-full mx-auto">
      <div className="relative transition-all duration-300 focus-within:shadow-md">
        <MagnifyingGlassIcon
          className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
            localValue ? "text-blue-500" : "text-gray-400"
          }`}
        />
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder="Digite o nome do curso..."
          className="w-full pl-10 pr-9 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        />
        {localValue && (
          <button
            type="button"
            onClick={() => setLocalValue("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
