"use client"

import {getToken} from "csa/lib/utils"
import Logo from "csa/components/ui/logo"
import Heading from "csa/components/ui/heading";
import Nav from "./nav";
import { useEffect, useState } from "react";
import Flex from "csa/components/ui/Flex";
import ApiRoutes from "csa/Rotas.json"
import Box from "csa/components/ui/Box";
import dpStyles from "./../Defaultpage.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames";
import { TextBorder } from "csa/lib/UtilsFrontEnd/TextBorder";
import useNavigate from "csa/hooks/useNavigate";


// O componente Main do Header


const Header = (
  {classname}:{classname?: string}
) => {
  const { navigate } = useNavigate();
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const [openNav, setOpenNav] = useState<boolean>(false)
  const [openAni, setOpenAni] = useState<boolean>(false)

  useEffect(() => {
    setIsLogged(!!getToken());
  }, []);

  const classnameHeader = MergeClassnames(dpStyles.Header, classname)
  const classnameContainerLogo = MergeClassnames(dpStyles.logoContainer, classname)
  const classnameLoginButtonsContainer = MergeClassnames(dpStyles.loginButtonsContainer, classname)
  const classnameLoginButtons = MergeClassnames(dpStyles.loginButtom, classname)
  const classnameNavButtom = MergeClassnames(dpStyles.navbutton, classname)



  return (
    <Box
      className={classnameHeader}
    >
        <Flex onClick={() => navigate(ApiRoutes.Home)} className={classnameContainerLogo}>
          <Logo/>
          <h1 > Causa Solídaria </h1>
        </Flex>
        
        <Flex className={classnameLoginButtonsContainer}>
          {isLogged === false &&  [
              {label: "Entrar", link: ApiRoutes.Login },
              {label: "Cadastrar", link: ApiRoutes.Cadastro}
            ].map(({label, link}, index) => (
              <Box
                className={classnameLoginButtons}
                key={index}
                onClick={() => navigate(link)}
              >
                <h2>{label}</h2>
              </Box>
            ))}
            <Box
              id="header-nav-toggle"
              className={classnameNavButtom}
              role="button"
              aria-haspopup="menu"
              aria-controls="header-nav"
              aria-expanded={openNav}
              tabIndex={0}
              onClick={()=>{setOpenNav(!openNav); setOpenAni(true)}}
              onKeyDown={(e)=>{
                if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenNav(!openNav); setOpenAni(true) }
                if(e.key === 'Escape') { setOpenNav(false) }
              }}
            />
        </Flex>

      <Nav open={openNav} anim={openAni} onClose={()=> setOpenNav(false)} classname={""} />
    </Box>
  )
}

export default Header
