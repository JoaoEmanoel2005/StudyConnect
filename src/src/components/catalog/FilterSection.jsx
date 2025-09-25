export default function FilterSection({ section, filtrosAtivos, handleFiltroChange }) {
  return (
    <div className="mb-6">
      <h3 className="text-base font-semibold text-primary mb-2">{section.name}</h3>

      {section.type === "checkbox" && (
        <div className="space-y-2">
          {section.options.map((option) => (
            <label key={option.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filtrosAtivos[section.id]?.includes(option.value) || false}
                onChange={() => handleFiltroChange(section.id, option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}

      {section.type === "radio" && (
        <div className="space-y-2">
          {section.options.map((option) => (
            <label key={option.value} className="flex items-center space-x-2">
              <input
                type="radio"
                name={section.id}
                checked={filtrosAtivos[section.id] === option.value}
                onChange={() => handleFiltroChange(section.id, option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}

      {section.type === "select" && (
        <select
          value={filtrosAtivos[section.id] || ""}
          onChange={(e) => handleFiltroChange(section.id, e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        >
          <option value="">Selecione</option>
          {section.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {section.type === "slider" && (
  <div className="px-2">
    <input
      type="range"
      min="0"
      max={section.options.length - 1}
      step="1"
      value={
        section.options.findIndex(
          (o) => o.value === filtrosAtivos[section.id]
        ) || 0
      }
      onChange={(e) => {
        const index = parseInt(e.target.value);
        handleFiltroChange(section.id, section.options[index].value);
      }}
      className="w-full accent-indigo-600"
    />
    <p className="text-sm text-gray-600 mt-2">
      {filtrosAtivos[section.id] || section.options[0].label}
    </p>
  </div>
)}

    </div>
  );
}
