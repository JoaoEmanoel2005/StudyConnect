import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import CourseCard from "../components/catalog/CourseCard";

export default function PerfilUsuario() {
  const { usuario } = useAuth();

  if (!usuario) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Você precisa estar logado</h2>
        <Link
          to="/login"
          className="text-white bg-accent px-4 py-2 rounded-lg hover:bg-accent-dark"
        >
          Fazer Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-12">
      {/* Informações básicas */}
      <section className="flex flex-col sm:flex-row items-center gap-6">
        <img
          src={usuario.avatar || "/default-avatar.png"}
          alt={usuario.name}
          className="w-24 h-24 rounded-full object-cover shadow-md"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{usuario.name}</h1>
          <p className="text-gray-600">{usuario.email}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-gray-700">
            <div>📚 Cursos em andamento: {usuario.cursosEmAndamento?.length || 0}</div>
            <div>🏆 Cursos concluídos: {usuario.cursosConcluidos?.length || 0}</div>
            <div>⏱️ Horas estudadas: {usuario.horasEstudadas || 0}</div>
          </div>
        </div>
      </section>

      {/* Cursos em andamento */}
      {usuario.cursosEmAndamento?.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Cursos em Andamento</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {usuario.cursosEmAndamento.map((curso) => (
              <div key={curso.id} className="border rounded-lg p-4 shadow-sm">
                <CourseCard curso={curso} />
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{ width: `${curso.progresso || 0}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{curso.progresso || 0}% concluído</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cursos salvos */}
      {usuario.cursosSalvos?.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Cursos Salvos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {usuario.cursosSalvos.map((curso) => (
              <CourseCard key={curso.id} curso={curso} />
            ))}
          </div>
        </section>
      )}

      {/* Certificados / Conquistas */}
      {usuario.certificados?.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Certificados e Conquistas</h2>
          <div className="flex flex-wrap gap-4">
            {usuario.certificados.map((cert, idx) => (
              <div
                key={idx}
                className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-md shadow-sm"
              >
                {cert.titulo}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Configurações da conta */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Configurações da Conta</h2>
        <Link
          to="/perfil/editar"
          className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all"
        >
          Editar Perfil
        </Link>
      </section>
    </div>
  );
}
