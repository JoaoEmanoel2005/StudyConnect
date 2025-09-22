import { filtrosCursos } from "../../data/filtersConfig";
import FilterSection from "../catalog/FilterSection";

export default function SidebarFilters({ filtrosAtivos, handleFiltroChange }) {
  return (
    <form className="hidden lg:block">
      {filtrosCursos.map((section) => (
        <FilterSection
          key={section.id}
          section={section}
          filtrosAtivos={filtrosAtivos}
          handleFiltroChange={handleFiltroChange}
        />
      ))}
    </form>
  );
}
