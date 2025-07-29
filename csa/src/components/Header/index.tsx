import { Box } from "@chakra-ui/react"
import { ScreenSize } from "csa/utils/getScreenSize"
import { isMobile } from "csa/utils/isMobile"
import LogoZone from "./LogoZone"
import ButtonZone from "./ButtonZone"



// O componente Main do Header

const Header = () => {
    // pega o tamanho da tela
    const { width, height } = ScreenSize()
    
    // verifica se é mobile
    const mobile = isMobile(width, height)
    
    // define o tamanho do cabeçalho baseado no tamanho da tela
    const headerHeight = mobile ? "10em" : "5em"

  return (
    <Box display="flex" flexDirection={mobile ? "column" : "row"} borderRadius={mobile ? "0 0 20px 20px" : "0"} bg="sec"  w={"100%"} minH="min-content" h={headerHeight} left={0} top={0} zIndex={100} transition="all 0.2s ease">
      <LogoZone />
      <ButtonZone />
    </Box>
  )
}

export default Header
