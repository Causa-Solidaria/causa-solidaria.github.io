import { Box, LinkBox, Link, Heading } from "@chakra-ui/react"
import Logo from "../../logo"
import { staticPosition } from "csa/utils/staticPosition"

const LogoZone = () => {

  return (
      <Box
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
      </Box>
  )
}

export default LogoZone
