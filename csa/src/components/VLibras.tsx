import { useEffect } from "react";

export default function VLibras() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // evita carregar duas vezes
    if (document.getElementById("vlibras-script")) return;

    // Adiciona o div necessário para o VLibras
    if (!document.getElementById("vlibras")) {
      const vlibrasDiv = document.createElement("div");
      vlibrasDiv.id = "vlibras";
      document.body.appendChild(vlibrasDiv);
    }

    const script = document.createElement("script");
    script.id = "vlibras-script";
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;

    script.onload = () => {
      if ((window as any).VLibras) {
        new (window as any).VLibras.Widget("https://vlibras.gov.br/app");
      }
    };

    document.head.appendChild(script);
  }, []);

  return null;
}
