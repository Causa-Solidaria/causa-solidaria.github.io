"use client"

import {getToken} from "csa/lib/utils"
import Logo from "csa/components/ui/logo"
import Heading from "csa/components/ui/heading";
import Nav from "./nav";
import { useEffect, useState } from "react";
import Flex from "csa/components/ui/Flex";
import {Cadastro, Login, Home} from "csa/Rotas.json"
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
      borderBottom={`${1} solid rgba(255,255,255,0.6)`}
    >
      <Flex
        position={"sticky"} 
        dir={"row"} 
        justifyContent={"space-between"}

        bg="#00B944"  
        w={"full"}
        p={"1vmax"}
        zIndex={100} 
        boxShadow={` 0 1vmax 1vmax  rgba(255,255,255,0.15) `}
      >
        <Flex
          onClick={()=>{ window.location.href=Home }}
          dir={"row"}
        >
          <Logo 
            borderRadius={"1vmax"}  
          />
          <Heading
            m={"1vmax"}
            fontSize={"2.5vmax"}
          >
            Causa Solídaria
          </Heading>
        </Flex>
        
        <Flex
          dir={"row"}
          alignItems={"center"}
          gap={"1vmax"}
        >
          {isLogged === false && <Flex
            dir={"row"}
            gapX={"1vmax"}
          >
            {[
              {label: "Entrar", link: Login },
              {label: "Cadastrar", link: Cadastro}
            ].map(({label, link}, index) => (
              <Box
                key={index}
                onClick={()=>{window.location.href = link}}
                bg = {"#006E1F"}
                p={"1vmax"}
                textAlign={"center"}
                textJustify={"center"}
                borderRadius={"1vmax"}
                transition={"scale 0.3s ease, translate 0.3s ease"}
                _hover={
                  {
                    scale: 1.025,
                    translate: `0 0.2vmax`
                  }
                }
              >
                <Heading
                  fontSize={"1vmax"}
                >
                  {label}
                </Heading>
              </Box>
            ))}
          </Flex>}

          <Box 
            m={"1vmax"}
            p={"1vmax"}
            bgImg={"url(/nav.png)"}
            bgPos={"center"}
            bgSize={"100%"}
            transition={
              "scale 0.3s ease-in-out"
            }
            aspectRatio={1}
            border={`0.1vmax solid black`}
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
