import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white text-sm p-4 flex justify-between items-center shadow-lg z-50">
      <p>
        Usamos cookies para melhorar sua experiência no site. Ao continuar, você
        concorda com nossa{" "}
        <a href="/politica-de-privacidade" className="underline">
          Política de Privacidade
        </a>.
      </p>
      <button
        onClick={handleAccept}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md ml-4"
      >
        Aceitar
      </button>
    </div>
  );
}
