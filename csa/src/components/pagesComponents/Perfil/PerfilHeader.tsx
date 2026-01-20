import { Flex, Heading, Avatar } from "csa/components/ui"
import { AlignFull } from "csa/lib/utils"
import { st, MAX_SIZE } from "./utils"

type PerfilHeaderProps = {
  name?: string
  foto?: string
  genero?: string
  email?: string
  numero?: string
  localizacao?: string
}

export default function PerfilHeader({ 
  name, 
  foto, 
  genero, 
  email, 
  numero, 
  localizacao 
}: PerfilHeaderProps) {
  return (
    <Flex pb={st(80)}>
      <Avatar 
        src={foto} 
        name={name} 
      />
      <Flex dir="column" ml={st(30)} gapY={st(20)} {...AlignFull("left")}>
        <Heading 
          color="#000" 
          fontSize={48} 
          fontStyle="italic" 
          fontWeight={900}
        >
          {name || 'Nome não informado'}
        </Heading>
        
        <Heading 
          color="#000" 
          fontSize={40} 
          fontStyle="italic" 
        >
          {genero ? `Voluntári${genero === "masculino" ? "o" : "a"}` : 'Gênero não informado'}
        </Heading>
        
        <Heading
          color="#000" 
          fontSize={40} 
          fontWeight={900}
        >
          <span style={{ fontWeight: 'normal' }}>Email: </span>
          {email || 'Não informado'}
        </Heading>
        
        <Heading
          color="#000" 
          fontSize={40} 
          fontWeight={900}
        >
          <span style={{ fontWeight: 'normal' }}>Telefone: </span>
          {numero || 'Não informado'}
        </Heading>

        <Heading
          color="#000" 
          fontSize={40} 
          fontWeight={900}
        >
          <span style={{ fontWeight: 'normal' }}>Localização: </span>
          {localizacao || 'Não informada'}
        </Heading>
      </Flex>
    </Flex>
  )
}
