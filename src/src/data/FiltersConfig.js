import { cursos } from "./Courses";

// Helper to count occurrences while maintaining order
const countOccurrences = (items, field) => {
  const counts = new Map();
  items.forEach(item => {
    const value = item[field];
    counts.set(value, (counts.get(value) || 0) + 1);
  });
  return counts;
};

// Generate options with counts
const generateOptions = (items, field, customOrder = null) => {
  const counts = countOccurrences(items, field);
  let options = Array.from(counts.entries()).map(([value, count]) => ({
    value: value?.toLowerCase()?.replace(/\s+/g, '-') ?? 'outros',
    label: value || 'Outros',
    count
  }));

  if (customOrder) {
    options.sort((a, b) => {
      const indexA = customOrder.indexOf(a.value);
      const indexB = customOrder.indexOf(b.value);
      return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
    });
  } else {
    options.sort((a, b) => a.label.localeCompare(b.label));
  }

  return options;
};

// Price range helper
const categorizePrices = (cursos) => {
  const ranges = [
    { value: "gratuito", label: "Gratuito", max: 0 },
    { value: "ate-100", label: "Até R$100", max: 100 },
    { value: "101-200", label: "R$101 - R$200", max: 200 },
    { value: "201-500", label: "R$201 - R$500", max: 500 },
    { value: "acima-500", label: "Acima de R$500", max: Infinity }
  ];

  const counts = ranges.map(range => ({
    ...range,
    count: cursos.filter(curso => {
      const price = curso.custo === "Gratuito" ? 0 : 
        Number(curso.custo.replace(/[^\d]/g, "")) || 0;
      const prevMax = ranges.find(r => r.value === range.value)?.max;
      const prevRangeMax = ranges[ranges.indexOf(range) - 1]?.max || 0;
      return price > prevRangeMax && price <= prevMax;
    }).length
  }));

  return counts;
};

export const filtrosCursos = [
  {
    id: "tipo",
    name: "Nível do Curso",
    type: "checkbox",
    description: "Selecione um ou mais níveis",
    options: generateOptions(cursos, "tipo")
  },
  {
    id: "categoria",
    name: "Área de Conhecimento",
    type: "select",
    placeholder: "Todas as áreas",
    options: generateOptions(cursos, "categoria")
  },
  {
    id: "modalidade",
    name: "Modalidade",
    type: "radio",
    options: generateOptions(cursos, "modalidade", ["presencial", "online", "hibrida", "ead"])
  },
  {
    id: "turno",
    name: "Turno",
    type: "checkbox",
    options: generateOptions(cursos, "turno", ["matutino", "vespertino", "noturno", "integral", "flexivel"])
  },
  {
    id: "instituicao",
    name: "Instituição",
    type: "select",
    placeholder: "Todas as instituições",
    options: generateOptions(cursos, "instituicao")
  },
  {
    id: "estado",
    name: "Estado",
    type: "select",
    placeholder: "Todos os estados",
    options: generateOptions(cursos, "estado")
  },
  {
    id: "preco",
    name: "Faixa de Preço",
    type: "radio",
    description: "Filtrar por valor da mensalidade",
    options: categorizePrices(cursos)
  }
];

export default filtrosCursos;
