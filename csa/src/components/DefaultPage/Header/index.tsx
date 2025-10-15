import { Box, Heading } from "@chakra-ui/react"
import { staticPosition } from "csa/utils/staticPosition"
import Logo from "csa/components/logo"
import { ensureLogged } from "csa/utils/isloged";



// O componente Main do Header

const Header = () => {
  const isLogged = ensureLogged();

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
      <Box
        onClick={()=>{ window.location.href="/" }}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        justifyItems={"center"}
        textAlign={"center"}
        p={staticPosition(10, 3197)}
        minH={staticPosition(173, 3197)}
        maxH={staticPosition(173, 3197)}
        minW={staticPosition(617, 3197)}
        maxW={staticPosition(617, 3197)}
      >
        <Logo width={staticPosition(173, 3197)} />
        <Heading
          fontSize={staticPosition(48, 3197)}
          minW={staticPosition(386, 3197)}
          maxW={staticPosition(386, 3197)}
          minH={staticPosition(67, 3197)}
          maxH={staticPosition(67, 3197)}
          textShadow={
            `${staticPosition(-5, 3197)} ${staticPosition(5, 3197)} 0  #000, 
            ${staticPosition(5, 3197)} ${staticPosition(-5, 3197)} 0  #000, 
            ${staticPosition(-5, 3197)} ${staticPosition(-5, 3197)}  0 #000,
            ${staticPosition(5, 3197)} ${staticPosition(5, 3197)}  0 #000,
            ${staticPosition(-5, 3197)} ${staticPosition(5, 3197)}  0 #000`
          }
          color="qui"
        >
          causa solidaria
        </Heading>

        {isLogged ? <Box></Box> : <Box></Box>}
      </Box>
    </Box>
  )
}

export default Header
