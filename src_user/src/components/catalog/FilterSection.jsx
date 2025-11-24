import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

// --- Função auxiliar para normalizar valores de forma segura ---
const normalize = (val) => {
  if (!val) return "";
  return val.toString().trim().toLowerCase().replace(/\s+/g, "-");
};

export default function FilterSection({ section, filtrosAtivos, handleFiltroChange }) {
  const [open, setOpen] = useState(true);
  const activeValue = filtrosAtivos[section.id];

  // Normaliza o valor ativo para comparação consistente
  const normalizedActive =
    Array.isArray(activeValue)
      ? activeValue.map(normalize)
      : normalize(activeValue);

  // Wrapper que normaliza antes de enviar para o handler pai
  const handleChange = (id, value) => {
    handleFiltroChange(id, normalize(value));
  };

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
          className={`h-5 w-5 text-gray-400 transform transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="mt-3">
          {/* --- CHECKBOX --- */}
          {section.type === "checkbox" && (
            <div className="flex flex-col gap-2">
              {section.options.map((option) => {
                const normalizedOption = normalize(option.value);
                const checked =
                  Array.isArray(normalizedActive) &&
                  normalizedActive.includes(normalizedOption);

                return (
                  <label
                    key={option.value}
                    className="flex items-center justify-between gap-2 p-1 cursor-pointer hover:bg-gray-50 rounded-md transition"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleChange(section.id, option.value)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </div>
                    {option.count !== undefined && (
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                        {option.count}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          )}

          {/* --- RADIO --- */}
          {section.type === "radio" && (
            <div className="flex flex-wrap gap-2">
              {section.options.map((option) => {
                const normalizedOption = normalize(option.value);
                const active = normalizedActive === normalizedOption;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange(section.id, option.value)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition ${
                      active
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {option.label}
                    {option.count !== undefined && (
                      <span className="ml-1 text-xs opacity-70">({option.count})</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* --- SELECT --- */}
          {section.type === "select" && (
            <div>
              <select
                value={activeValue || ""}
                onChange={(e) => handleChange(section.id, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white focus:ring-primary focus:border-primary"
              >
                <option value="">{section.placeholder ?? "Selecione"}</option>
                {section.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} ({option.count})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
