import AuthForm from "../../components/others/AuthForm";

export default function Cadastro() {
  const handleCadastro = (formData) => {
    console.log("Tentando cadastro com:", formData);
    // aqui você chama sua API de cadastro
  };

  return <AuthForm type="cadastro" onSubmit={handleCadastro} />;
}

