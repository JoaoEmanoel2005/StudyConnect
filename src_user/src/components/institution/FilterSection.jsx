import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function FilterSection({ section, filtrosAtivos, handleFiltroChange }) {
  const [open, setOpen] = useState(true);
  const activeValue = filtrosAtivos[section.id];

  const isCheckbox = section.type === "checkbox";
  const isRadio = section.type === "radio";
  const isSelect = section.type === "select";

  return (
    <div className="mb-6">
      {/* Header do filtro com toggle */}
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-gray-50"
        aria-expanded={open}
      >
        <h3 className="text-base font-semibold text-red-800">{section.name}</h3>
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-400 transform transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mt-3">
          {/* Checkbox */}
          {isCheckbox && (
            <div className="flex flex-col gap-2">
              {section.options.map((option) => {
                const checked = Array.isArray(activeValue) && activeValue.includes(option.value);
                return (
                  <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleFiltroChange(section.id, option.value)}
                      className="sr-only"
                      aria-checked={checked}
                    />
                    <span
                      className={`flex items-center justify-center h-5 w-5 rounded-md border transition-colors ${
                        checked ? "bg-accent border-accent" : "bg-white border-gray-300"
                      }`}
                      aria-hidden
                    >
                      {checked && (
                        <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M5 13l4 4L19 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-sm text-gray-700">{option.label}</span>
                      {option.count !== undefined && (
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                          {option.count}
                        </span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          )}

          {/* Radio */}
          {isRadio && (
            <div className="flex flex-wrap gap-2">
              {section.options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleFiltroChange(section.id, option.value)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition ${
                    activeValue === option.value
                      ? "bg-accent text-white border-accent"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {/* Select */}
          {isSelect && (
            <div>
              <select
                value={activeValue || ""}
                onChange={(e) => handleFiltroChange(section.id, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white focus:ring-accent focus:border-accent"
              >
                <option value="">{section.placeholder ?? "Selecione"}</option>
                {section.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} {option.count !== undefined ? `(${option.count})` : ""}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Texto de ajuda opcional */}
          {section.description && <p className="text-xs text-gray-400 mt-2">{section.description}</p>}
        </div>
      )}
    </div>
  );
}
