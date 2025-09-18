import AuthForm from "../../components/others/AuthForm";

export default function Login() {
  const handleLogin = (formData) => {
    console.log("Login:", formData);
    // aqui você chama sua API de login
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
}
