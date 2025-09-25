import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import CourseCard from "../components/catalog/CourseCard";

export default function PerfilUsuario() {
  const { usuario } = useAuth();

  if (!usuario) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Você precisa estar logado</h2>
        <Link to="/login" className="text-white bg-accent px-4 py-2 rounded-lg hover:bg-accent-dark">
          Fazer Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      {/* Informações básicas */}
      <section className="mb-10 flex items-center gap-6">
        <img
          src={usuario.avatar || '/default-avatar.png'}
          alt={usuario.name}
          className="w-24 h-24 rounded-full object-cover shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold">{usuario.name}</h1>
          <p className="text-gray-600">{usuario.email}</p>
        </div>
      </section>

      {/* Cursos salvos */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Cursos Salvos</h2>
        {usuario.cursosSalvos && usuario.cursosSalvos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {usuario.cursosSalvos.map((curso) => (
              <CourseCard key={curso.id} curso={curso} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Você ainda não salvou nenhum curso.</p>
        )}
      </section>

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
