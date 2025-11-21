"use client"

import { SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/utils/staticPositions"
import Logo from "csa/components/logo"
import { getToken } from "csa/utils/isloged";
import Heading from "csa/components/ui/heading";
import Nav from "./nav";
import { useEffect, useState } from "react";
import TextBorder from "csa/utils/textBorder";
import Flex from "csa/components/ui/Flex";
import JustifyFull, { AlignFull } from "csa/utils/JustifyFullCenter";
import {Cadastro, Login} from "csa/Rotas.json"
import Box from "csa/components/ui/Box";


// O componente Main do Header

const Header = () => {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const [openNav, setOpenNav] = useState<boolean>(false)
  const [openAni, setOpenAni] = useState<boolean>(false)

  useEffect(() => {
    setIsLogged(!!getToken());
  }, []);

  return (
    <Box
      borderBottom={`${staticPosition(1)} solid #000`}
    >
      <Flex
        position={"sticky"} 
        dir={"row"} 
        {...AlignFull("center")}
        justifyContent={"space-between"}
        top={0} 

        bg="#00B944"  
        {...SetStaticPositionW(1,1)}
        {...SetStaticPositionH(244, 3197)}
        zIndex={100} 
        pr={staticPosition(67, 3197)}
        boxShadow={` 0 ${staticPosition(30, 3197)} ${staticPosition(30, 3197)}  rgba(0,0,0,0.15) `}
      >
        <Flex
          onClick={()=>{ window.location.href="/" }}
          dir={"row"}
          {...AlignFull()}
          {...JustifyFull()}
          pl={staticPosition(67, 3197)}
          {...SetStaticPositionW(617, 3197)}
          {...SetStaticPositionH(173, 3197)}
        >
          <Logo 
            {...SetStaticPositionW(173, 3197)}
            borderRadius={staticPosition(1, 250)}  
          />
          <Heading
            
            fontSize={48}
            w={386}
            h={67}
            fontWeight={900}

            color="qui"
            {...(TextBorder(5))}
          >
            Causa Solídaria
          </Heading>
        </Flex>
        
        <Flex
          dir={"row"}
          alignItems={"center"}
          gap={staticPosition(40, 3197)}
        >
          {isLogged === false && <Flex
            dir={"row"}
            gap={staticPosition(40, 3197)}
          >
            {[
              {label: "entrar", link: Login },
              {label: "cadastrar", link: Cadastro}
            ].map(({label, link}, index) => (
              <Box
                key={index}
                onClick={()=>{window.location.href = link}}
                bg = {"#006E1F"}
                px={staticPosition(30, 3197)}
                {...SetStaticPositionW(278, 3197)}
                textAlign={"center"}
                borderRadius={staticPosition(12, 3197)}
                transition={"scale 0.3s ease, translate 0.3s ease"}
                _hover={
                  {
                    scale: 1.025,
                    translate: `0 ${staticPosition(-2, 3197)}`
                  }
                }
              >
                <Heading
                  h = {70}
                  {...TextBorder(3, 3197)}
                  color={"qui"}
                >
                  {label}
                </Heading>
              </Box>
            ))}
          </Flex>}

          <Box 
            {...SetStaticPositionW(137, 3197)}
            {...SetStaticPositionH(137, 3197)}
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
            onClick={()=>{setOpenNav(!openNav); setOpenAni(true)}}
          >
          </Box>
        </Flex>

      </Flex>
      <Nav open={openNav} anim={openAni}/>
    </Box>
  )
}

export default Header
