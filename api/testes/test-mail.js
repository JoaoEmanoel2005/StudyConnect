require("dotenv").config({ path: __dirname + "/../.env" });
const transporter = require("../config/mailer");

(async () => {
  try {
    await transporter.sendMail({
      from: `"Servidor de Teste" <${process.env.SMTP_USER}>`,
      to: "jurimeusoyeu19@gmail.com",
      subject: "Teste de Envio",
      text: "Se você recebeu este email, está funcionando!",
    });
    console.log("✅ Email enviado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao enviar email:", error);
  }
})();
