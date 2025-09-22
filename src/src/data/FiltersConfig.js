export const filtrosCursos = [
  {
    id: 'categoria',
    name: 'Áreas de Conhecimento',
    options: [
      { value: "Tecnologia", label: "Tecnologia" },
      { value: "Negócios", label: "Negócios" },
      { value: "Design", label: "Design" },
      { value: "Marketing", label: "Marketing" },
      { value: "Ciência de Dados", label: "Ciência de Dados" },
      { value: "Liderança", label: "Liderança" },
      { value: "Finanças", label: "Finanças" },
      { value: "Produtos", label: "Produtos" },
      { value: "Saúde", label: "Saúde" },
      { value: "Engenharia", label: "Engenharia" },
      { value: "Desenvolvimento Pessoal", label: "Desenvolvimento Pessoal" },
      { value: "Humanas", label: "Humanas" },
      {/* Adicione mais categorias conforme necessário */}
    ],
  },
  {
    id: 'tipo',
    name: 'Tipos de Curso',
    options: [
        { value: 'Graduação', label: 'Graduação', checked: false },
        { value: 'Pós-graduação', label: 'Pós-graduação', checked: false },
        { value: 'Cursos Técnicos', label: 'Cursos Técnicos', checked: false },
        { value: 'Cursos Livres', label: 'Cursos Livres', checked: false },
        { value: 'Cursos de Extensão', label: 'Cursos de Extensão', checked: false },
        { value: 'Cursos de Idiomas', label: 'Cursos de Idiomas', checked: false },
        { value: 'Cursos Preparatórios', label: 'Cursos Preparatórios', checked: false },
        { value: 'Cursos de Bacharelados', label: 'Cursos de Bacharelados', checked: false },
        { value: 'Cursos de Licenciatura', label: 'Cursos de Licenciatura', checked: false },
        { value: 'Cursos de Aperfeiçoamento', label: 'Cursos de Aperfeiçoamento', checked: false },
        { value: 'Cursos de Especialização', label: 'Cursos de Especialização', checked: false },
        { value: 'Cursos de MBA', label: 'Cursos de MBA (Master in Business Administration)', checked: false },
        { value: 'Cursos de Desenvolvimento Pessoal', label: 'Cursos de Desenvolvimento Pessoal', checked: false },
        { value: 'Cursos de Habilidades Específicas', label: 'Cursos de Habilidades Específicas', checked: false },
        { value: 'Mestrado e Doutorado', label: 'Mestrado e Doutorado', checked: false },

    ],
  },
  {
    id: 'modalidade',
    name: 'Modalidades de Ensino',
    options: [
      { value: 'Presencial', label: 'Presencial', checked: false },
      { value: 'EAD', label: 'EAD', checked: false },
    ],
  },
  {
    id: 'estado',
    name: 'Estado do Curso',
    options: [
        { value: 'São Paulo', label: 'São Paulo', checked: false },
        { value: 'Rio de Janeiro', label: 'Rio de Janeiro', checked: false },
        { value: 'Belo Horizonte', label: 'Belo Horizonte', checked: false },
        {/* Adicione mais categorias conforme necessário */}
    ],
  },
  {
    id: 'cidade',
    name: 'Cidade do Curso',
    options: [
        { value: 'São Paulo', label: 'São Paulo - Capital', checked: false },
        { value: 'São José dos Campos', label: 'São José dos Campos', checked: false },
        { value: 'Taubaté', label: 'Taubaté', checked: false },
        { value: 'Caçapava', label: 'Caçapava', checked: false },
        { value: 'Jacareí', label: 'Jacareí', checked: false },
        { value: 'Pindamonhangaba', label: 'Pindamonhangaba', checked: false },
        { value: 'Aparecida', label: 'Aparecida', checked: false },
        { value: 'Guaratinguetá', label: 'Guaratinguetá', checked: false },
        { value: 'Lorena', label: 'Lorena', checked: false },
        { value: 'Cachoeira Paulista', label: 'Cachoeira Paulista', checked: false },
        { value: 'Cruzeiro', label: 'Cruzeiro', checked: false },
        { value: 'Silveiras', label: 'Silveiras', checked: false },
        { value: 'Bananal', label: 'Bananal', checked: false },
        { value: 'Rio de Janeiro', label: 'Rio de Janeiro', checked: false },
        {/* Adicione mais categorias conforme necessário */}
    ],
  },
  {
    id: 'nivel',
    name: 'Nível de Dificuldade',
    options: [
      { value: "Iniciante", label: "Iniciante" },
      { value: "Intermediário", label: "Intermediário" },
      { value: "Avançado", label: "Avançado" },
      { value: "Todos", label: "Todos" },
      {/* Adicione mais categorias conforme necessário */}
    ],
  },

  { id: 'preco',
    name: 'Faixa de Preço',
    options: [
      { value: 'Gratuito', label: 'Gratuito', checked: false },
      { value: 'Abaixo de R$100', label: 'Abaixo de R$100', checked: false },
      { value: 'R$100 - R$500', label: 'R$100 - R$500', checked: false },
      { value: 'R$500 - R$900', label: 'R$500 - R$900', checked: false },
      { value: 'Acima de R$1.000', label: 'Acima de R$1.000', checked: false },
    ],
  }, 
  {
    id: 'duracao',
    name: 'Duração do Curso',
    options: [
      { value: 'Menos de 1 mês', label: 'Menos de 1 mês', checked: false },
      { value: '1 a 3 meses', label: '1 a 3 meses', checked: false },
      { value: '3 a 6 meses', label: '3 a 6 meses', checked: false },
      { value: '6 meses a 1 ano', label: '6 meses a 1 ano', checked: false },
      { value: 'Mais de 1 ano', label: 'Mais de 1 ano', checked: false },
    ],
  },
  {
    id: 'foco',
    name: 'Foco de Carreira',
    options: [
      { value: "Mudança de Carreira", label: "Mudança de Carreira" },
      { value: "Atualização de Habilidades", label: "Atualização de Habilidades" },
      { value: "Promoção", label: "Promoção" },
      { value: "Freelancing", label: "Freelancing" },
      { value: "Empreendedorismo", label: "Empreendedorismo" },
      { value: "Certificação", label: "Certificação" },
      { value: "Crescimento Pessoal", label: "Crescimento Pessoal" },
      { value: "Networking", label: "Networking" },
      {/* Adicione mais categorias conforme necessário */}
    ],
  }
];

export const sortOptions = [
    { name: 'Mais populares', current: true },
    { name: 'Mais recentes', current: false },
    { name: 'Menor preço', current: false },
    { name: 'Maior preço', current: false },
    { name: 'Duração', current: false },
    { name: 'Avaliações', current: false },
];
