
import {Perfil, Home, Fóruns, ONGs, Campanhas} from "csa/Rotas.json"

type ButtonItem = { title: string; link: string };

// Botões base (sempre mostrados)
export const baseButtons: ButtonItem[] = [
    { title: "Inicio", link: Home },
    { title: "Forúns", link: Fóruns.Home },
    { title: "ONGs", link: ONGs.Home },
    { title: "Campanhas", link: Campanhas.Home },
]

// Botão de perfil (só para usuários logados)
export const perfilButton: ButtonItem = { title: "Perfil", link: Perfil.Home }

// Para manter compatibilidade, exportar os botões base como default
export default baseButtons