import { useContext } from "react";
import { PopupContext } from "csa/components/ProviderPopup/utils";

export default function usePopup(): (message: string) => void {
    const ctx = useContext(PopupContext);
    if (!ctx || typeof ctx.AlertPopup !== 'function') {
        throw new Error("usePopup precisa estar dentro de <PopupProvider> e AlertPopup precisa estar definido");
    }
    return ctx.AlertPopup;
}