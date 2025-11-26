
import {Perfil, Home, Fóruns, ONGs, Campanhas} from "csa/Rotas.json"
import { getToken, isTokenExpired } from "csa/utils/isloged"


const b =  []

if (!isTokenExpired(getToken() as string))b.push( { title: "Perfil",link: Perfil.Home});
b.push({title: "Inicio",link: Home});
b.push({title: "Forúns", link: Fóruns.Home});
b.push({title: "ONGs", link: ONGs.Home});
b.push({title: "Campanhas", link: Campanhas.Home});

export default b