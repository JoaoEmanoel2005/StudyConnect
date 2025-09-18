import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function FilterSection({ section, filtrosAtivos, handleFiltroChange }) {
  return (
    <Disclosure as="div" className="border-b border-gray-200 py-4">
      <Disclosure.Button className="flex w-full justify-between text-left text-gray-900 font-medium">
        {section.name}
        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
      </Disclosure.Button>
      <Disclosure.Panel className="pt-4 space-y-2">
        {section.options.map((option) => (
          <label key={option.value} className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              checked={filtrosAtivos[section.id]?.includes(option.value) || false}
              onChange={() => handleFiltroChange(section.id, option.value)}
            />
            {option.label}
          </label>
        ))}
      </Disclosure.Panel>
    </Disclosure>
  );
}
