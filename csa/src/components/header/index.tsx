import { Box } from "@chakra-ui/react"
import { ScreenSize } from "csa/utils/getScreenSize"
import { isMobile } from "./headerUtils"
import LogoZone from "./LogoZone"
import ButtonZone from "./ButtonZone"



// O componente Main do Header

const Header = () => {
    // pega o tamanho da tela
    const { width, height } = ScreenSize()
    
    // verifica se é mobile
    const mobile = isMobile(width, height)
    
    // define o tamanho do cabeçalho baseado no tamanho da tela
    const headerHeight = mobile ? "13em" : "6em"

  return (
    <Box display="flex" direction="row" bg="sec"  w={width} minH="min-content" h={headerHeight} top={0} zIndex={100} transition="all 0.2s ease">
      <LogoZone />
      {!mobile && <ButtonZone alignSelf={"center"} />}
    </Box>
  )
}

export default Header
