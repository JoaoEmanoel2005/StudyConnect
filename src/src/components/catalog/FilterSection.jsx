import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function FilterSection({ section, filtrosAtivos, handleFiltroChange }) {
  // Estado local para slider de preço
  const [preco, setPreco] = useState(filtrosAtivos[section.id]?.[0] || 0);

  const renderFilter = () => {
    switch (section.type) {
      case "slider":
        return (
          <div className="pt-2">
            <input
              type="range"
              min={section.min}
              max={section.max}
              step={section.step || 50}
              value={preco}
              onChange={(e) => {
                setPreco(e.target.value);
                handleFiltroChange(section.id, e.target.value);
              }}
              className="w-full accent-indigo-600"
            />
            <p className="text-sm text-gray-600 mt-2">Até R$ {preco}</p>
          </div>
        );

      case "radio":
        return (
          <div className="pt-2 space-y-2">
            {section.options.map((option) => (
              <label key={option.value} className="flex items-center gap-2 text-gray-600">
                <input
                  type="radio"
                  name={section.id}
                  checked={filtrosAtivos[section.id]?.includes(option.value) || false}
                  onChange={() => handleFiltroChange(section.id, option.value)}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                {option.label}
              </label>
            ))}
          </div>
        );

      case "select":
        return (
          <select
            className="mt-2 w-full border rounded-md p-2 text-gray-700"
            value={filtrosAtivos[section.id]?.[0] || ""}
            onChange={(e) => handleFiltroChange(section.id, e.target.value)}
          >
            <option value="">Todos</option>
            {section.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      default:
        return (
          <div className="pt-2 space-y-2">
            {section.options.map((option) => (
              <label key={option.value} className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={filtrosAtivos[section.id]?.includes(option.value) || false}
                  onChange={() => handleFiltroChange(section.id, option.value)}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                {option.label}
              </label>
            ))}
          </div>
        );
    }
  };

  return (
    <Disclosure as="div" className="border-b border-gray-200 py-4">
      <Disclosure.Button className="flex w-full justify-between text-left text-gray-900 font-medium">
        {section.name}
        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
      </Disclosure.Button>
      <Disclosure.Panel>{renderFilter()}</Disclosure.Panel>
    </Disclosure>
  );
}
