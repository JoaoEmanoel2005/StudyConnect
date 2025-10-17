import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function FilterSection({ section, filtrosAtivos, handleFiltroChange }) {
  const [open, setOpen] = useState(true);
  const activeValue = filtrosAtivos[section.id];

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-gray-50"
        aria-expanded={open}
      >
        <h3 className="text-base font-semibold text-primary">{section.name}</h3>
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-400 transform transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mt-3">
          {section.type === "checkbox" && (
            <div className="flex flex-col gap-2">
              {section.options.map((option) => {
                const checked = Array.isArray(activeValue) && activeValue.includes(option.value);
                return (
                  <label key={option.value} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleFiltroChange(section.id, option.value)}
                      className="sr-only"
                      aria-checked={checked}
                    />
                    <span
                      className={`flex items-center justify-center h-5 w-5 rounded-md border transition-colors ${
                        checked ? "bg-primary border-primary" : "bg-white border-gray-300"
                      }`}
                      aria-hidden
                    >
                      {checked ? (
                        <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : null}
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

          {section.type === "radio" && (
            <div className="flex flex-wrap gap-2">
              {section.options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleFiltroChange(section.id, option.value)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition ${
                    activeValue === option.value
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {section.type === "select" && (
            <div>
              <select
                value={activeValue || ""}
                onChange={(e) => handleFiltroChange(section.id, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white focus:ring-primary focus:border-primary"
              >
                <option value="">{section.placeholder ?? "Selecione"}</option>
                {section.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {section.type === "slider" && (
            <div className="px-2">
              <input
                type="range"
                min="0"
                max={Math.max(0, section.options.length - 1)}
                step="1"
                value={
                  Math.max(
                    0,
                    section.options.findIndex((o) => o.value === activeValue)
                  ) || 0
                }
                onChange={(e) => {
                  const index = parseInt(e.target.value, 10);
                  handleFiltroChange(section.id, section.options[index].value);
                }}
                className="w-full accent-primary"
              />
              <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                <span>{section.options[0]?.label}</span>
                <span>{activeValue || section.options[0]?.label}</span>
                <span>{section.options[section.options.length - 1]?.label}</span>
              </div>
            </div>
          )}

          {/* optional help text */}
          {section.description && <p className="text-xs text-gray-400 mt-2">{section.description}</p>}
        </div>
      )}
    </div>
  );
}