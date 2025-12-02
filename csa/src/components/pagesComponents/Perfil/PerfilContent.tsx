import { Box } from "csa/components/ui"
import { SetStaticPositionW } from "csa/lib/utils"
import { st, MAX_SIZE } from "./utils"
import PerfilHeader from "./PerfilHeader"
import PerfilBio from "./PerfilBio"
import PerfilInteresses from "./PerfilInteresses"
import PerfilOngs from "./PerfilOngs"
import PerfilCampanhas from "./PerfilCampanhas"

type PerfilContentProps = {
  data: {
    name?: string
    bio?: string
    foto?: string
    numero?: string
    email?: string
    localizacao?: string
    areasDeInteresse?: string[]
    genero?: string
    ong?: any[]
    campanhas?: any[]
  }
}

export default function PerfilContent({ data }: PerfilContentProps) {
  const {
    name,
    bio,
    foto,
    numero,
    email,
    localizacao,
    areasDeInteresse = [],
    genero,
    ong = [],
    campanhas = []
  } = data

  return (
    <Box 
      m={st(25)}
      p={st(50)}
      borderRadius={st(25)}
      {...SetStaticPositionW(1430, MAX_SIZE)}
      minH={st(1600)}
      border={`${st(3)} solid #000`}
    >
      <PerfilHeader 
        name={name}
        foto={foto}
        genero={genero}
        email={email}
        numero={numero}
        localizacao={localizacao}
      />
      <PerfilBio bio={bio} />
      <PerfilInteresses areasDeInteresse={areasDeInteresse} />
      <PerfilOngs ongs={ong} />
      <PerfilCampanhas campanhas={campanhas} />
    </Box>
  )
}
