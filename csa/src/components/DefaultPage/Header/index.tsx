import { Box, Flex} from "@chakra-ui/react"
import { staticPosition } from "csa/utils/staticPosition"
import Logo from "csa/components/logo"
import { getToken } from "csa/utils/isloged";
import Heading from "csa/components/ui/heading";
import Nav from "./nav";
import { useState } from "react";
import { scale } from "framer-motion";
import TextBorder from "csa/utils/textBorder";



// O componente Main do Header

const Header = () => {
  const isLogged = getToken();
  const [openNav, setOpenNav] = useState<boolean>(false)

  return (
    <Box>
      <Flex 
        direction={"row"} 
        alignItems="center"
        justifyContent={"space-between"}
        borderRadius={0} 
        position={"sticky"} 
        top={0} 

        bg="#00B944"  
        maxW={"100vmax"}
        minW={"100vmax"}
        minH={staticPosition(244, 3197)} 
        h={staticPosition(244, 3197)} 
        zIndex={100} 
        px={staticPosition(67, 3197)}
        border={`${staticPosition(2, 3197)} solid black`}
      >
        <Box
          onClick={()=>{ window.location.href="/" }}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
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
            
            fontSize={48}
            w={386}
            h={67}
            fontWeight={900}

            color="qui"
            {...TextBorder(5, 3197)}
          >
            Causa Solídaria
          </Heading>
        </Box>
        
        <Flex
          direction={"row"}
          alignItems={"center"}
          gap={staticPosition(40, 3197)}
        >
          {!isLogged && <Flex
            direction={"row"}
            gap={staticPosition(40, 3197)}
          >
            {[
              {label: "entrar", link: "/login"},
              {label: "cadastrar", link: "/cadastro"}
            ].map(({label, link}, index) => (
              <Box
                key={index}
                onClick={()=>{window.location.href = link}}
                bg = {"ter"}
                px={staticPosition(30, 3197)}
                minW={staticPosition(250, 3197)}
                textAlign={"center"}
                borderRadius={staticPosition(12, 3197)}
                transition={"scale 0.3s ease, translate 0.3s ease"}
                _hover={
                  {
                    scale: 1.025,
                    translate: `0 ${staticPosition(-2, 3197)}`
                  }
                }
                border={`${staticPosition(2, 3197)} solid black`}
              >
                <Heading
                  h = {70}
                  {...TextBorder(3, 3197)}
                >
                  {label}
                </Heading>
              </Box>
            ))}
          </Flex>}

          <Box 
            maxW={staticPosition(137, 3197)}
            minW={staticPosition(137, 3197)}
            maxH={staticPosition(137, 3197)}
            minH={staticPosition(137, 3197)}
            bgImg={"url(/nav.png)"}
            bgPos={"center"}
            bgSize={"100%"}
            transition={
              "scale 0.3s ease-in-out"
            }
            aspectRatio={1}
            border={`${staticPosition(4, 3197)} solid black`}
            _hover={
              {scale: 1.05}
            }
            onClick={()=>setOpenNav(!openNav)}
          >
          </Box>
        </Flex>

      </Flex>
      <Nav open={openNav}/>
    </Box>
  )
}

export default Header
