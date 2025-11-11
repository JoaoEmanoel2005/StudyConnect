import { instituicao } from "./Institution";

export function buildInstitutionFilters(data = []) {
  // helpers
  const safe = (v) => (v ?? "").toString().trim();
  const normalizeCity = (c) => safe(c).split(" - ")[0].trim();
  const parsePrice = (s) => {
    if (!s) return null;
    if (/grat/i.test(s)) return 0;
    const digits = s.replace(/[^\d]/g, "");
    if (!digits) return null;
    return Number(digits) / 100; // "18000" -> 180.00
  };

  // gather counts
  const counts = {
    tipo: new Map(),
    estado: new Map(),
    cidade: new Map(),
    area: new Map(),
    precoBucket: new Map(),
  };

  const priceBuckets = [
    { id: "gratuito", label: "Gratuito", min: 0, max: 0 },
    { id: "baixo", label: "Abaixo de R$150", min: 0.01, max: 150 },
    { id: "medio", label: "R$150 - R$250", min: 150.01, max: 250 },
    { id: "alto", label: "Acima de R$250", min: 250.01, max: Infinity },
  ];

  const bucketFor = (val) => {
    if (val === null || val === undefined) return "unknown";
    for (const b of priceBuckets) {
      if (val >= b.min && val <= b.max) return b.id;
    }
    return "unknown";
  };

  data.forEach((item) => {
    const t = safe(item.tipo) || "—";
    counts.tipo.set(t, (counts.tipo.get(t) || 0) + 1);

    const st = safe(item.estado) || "—";
    counts.estado.set(st, (counts.estado.get(st) || 0) + 1);

    const city = normalizeCity(item.cidade) || "—";
    counts.cidade.set(city, (counts.cidade.get(city) || 0) + 1);

    const area = safe(item.area) || "—";
    counts.area.set(area, (counts.area.get(area) || 0) + 1);

    const price = parsePrice(item.custo_matricula);
    const bucket = bucketFor(price);
    counts.precoBucket.set(bucket, (counts.precoBucket.get(bucket) || 0) + 1);
  });

  const mapToOptions = (map, sort = true) =>
    [...map.entries()]
      .map(([value, count]) => ({ value, label: value === "—" ? "Não informado" : value, count }))
      .sort((a, b) => (sort ? a.label.localeCompare(b.label, "pt-BR", { sensitivity: "base" }) : 0));

  const priceOptions = priceBuckets.map((b) => ({
    value: b.id,
    label: b.label,
    count: counts.precoBucket.get(b.id) || 0,
  }));

  return [
    {
      id: "tipo",
      name: "Tipo",
      type: "checkbox",
      options: mapToOptions(counts.tipo),
    },
    {
      id: "estado",
      name: "Estado / UF",
      type: "select",
      placeholder: "Todas as unidades federativas",
      options: mapToOptions(counts.estado),
    },
    {
      id: "cidade",
      name: "Cidade",
      type: "select",
      placeholder: "Qual cidade?",
      options: mapToOptions(counts.cidade),
    },
    {
      id: "area",
      name: "Área de Atuação",
      type: "checkbox",
      options: mapToOptions(counts.area),
    },
  ];
}

export const filtrosInstituicoes = buildInstitutionFilters(instituicao);