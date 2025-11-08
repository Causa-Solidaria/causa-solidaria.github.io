import { useContext } from "react";
import { PopupContext } from "csa/components/ProviderPopup/utils";

export default function usePopup(): (message: string) => void {
    const ctx = useContext(PopupContext);
    const fn = ctx?.AlertPopup;
    if (!fn) console.log("error ao chama o usepopup")
    if (typeof fn !== 'function') {
        if (process.env.NODE_ENV !== 'production') {
            throw new Error("usePopup precisa estar dentro de <PopupProvider> e AlertPopup precisa estar definido");
        }
        // Fallback em produção para não quebrar a UI
        return (message: string) => {
            try { console.warn('[Popup] Provider ausente. Mensagem:', message); } catch {}
        };
    }
    return fn;
}