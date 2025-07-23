import { Box } from "@chakra-ui/react"
import { ScreenSize } from "csa/utils/getScreenSize"
import { isMobile } from "./headerUtils"
import LogoZone from "./LogoZone"
import ButtonZone from "./ButtonZone"

const Header = () => {
    // pega o tamanho da tela
    const { width, height } = ScreenSize()
    
    // verifica se é mobile
    const mobile = isMobile(width, height)
    
    // define o tamanho do cabeçalho baseado no tamanho da tela
    const headerBreakpoint = mobile ? "13em" : "6em"

  return (
    <Box
      display="flex"
      direction="row"
      bg="sec"
      w="100%"
      minH="min-content"
      h={headerBreakpoint}
      top={0}
      zIndex={100}
      transition="all 0.2s ease"
    >
      <LogoZone />
      {!mobile && <ButtonZone />}
    </Box>
  )
}

export default Header
