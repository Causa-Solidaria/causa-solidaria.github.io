import { useContext } from "react";
import {PopupContext} from "csa/components/ProviderPopup/utils";

export default function usePopup(){
    const ctx = useContext(PopupContext);
    if (!ctx) throw new Error("usePopup precisa estar dentro de <PopupProvider>")
    return ctx.AlertPopup
}