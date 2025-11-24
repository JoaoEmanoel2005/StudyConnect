import { forwardRef } from "react";
import { RocketLaunchIcon, LightBulbIcon } from "@heroicons/react/24/outline";


const MissionSection = forwardRef(() => {

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="mission-card bg-white rounded-2xl border-2 border-blue-200 p-8 transition-all duration-300 shadow-sm hover:shadow-md">
          <div className="inline-flex p-3 bg-blue-100 rounded-xl mb-4">
            <RocketLaunchIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Nossa Missão</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Facilitar o processo de escolha de cursos superiores, promovendo uma integração 
            eficiente entre as ofertas educacionais e as demandas dos estudantes brasileiros.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Acreditamos que a informação clara e acessível é fundamental para decisões 
            acadêmicas conscientes e alinhadas com os objetivos de carreira de cada estudante.
          </p>
        </div>

        <div className="mission-card bg-white rounded-2xl border-2 border-amber-200 p-8 transition-all duration-300 shadow-sm hover:shadow-md">
          <div className="inline-flex p-3 bg-amber-100 rounded-xl mb-4">
            <LightBulbIcon className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Nosso Objetivo</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Criar um ambiente interativo onde estudantes possam acessar informações relevantes, 
            receber sugestões personalizadas de cursos e estabelecer comunicação direta com 
            instituições de ensino.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Transformar a busca por educação superior em uma experiência simples, transparente 
            e empoderadora para todos os usuários.
          </p>
        </div>
      </div>
    </div>
  );
});

export default MissionSection;
