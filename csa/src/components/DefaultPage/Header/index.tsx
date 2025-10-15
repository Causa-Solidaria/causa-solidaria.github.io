import { Box } from "@chakra-ui/react"
import LogoZone from "./LogoZone"
import ButtonZone from "./ButtonZone"
import { staticPosition } from "csa/utils/staticPosition"



// O componente Main do Header

const Header = () => {
  return (
    <Box 
      display="flex" 
      flexDirection={"row"} 
      alignItems="center"
      borderRadius={0} 
      position={"sticky"}
      bg="sec"  
      w={"100vmax"} 
      minH={staticPosition(244, 3197)} 
      h={staticPosition(244, 3197)} 
      left={0} 
      top={0} 
      zIndex={100} 
      px={staticPosition(67, 3197)}
    >
      <LogoZone />

    </Box>
  )
}

export default Header
