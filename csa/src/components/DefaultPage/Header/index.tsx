"use client"

import {getToken} from "csa/lib/utils"
import Logo from "csa/components/ui/logo"
import Nav from "./nav";
import { useCallback, useEffect, useState } from "react";
import Flex from "csa/components/ui/Flex";
import ApiRoutes from "csa/Rotas.json"
import Box from "csa/components/ui/Box";
import dpStyles from "./../Defaultpage.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames";
import useNavigate from "csa/hooks/useNavigate";


// O componente Main do Header


const Header = (
  {classname}:{classname?: string}
) => {
  const { navigate } = useNavigate();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [openNav, setOpenNav] = useState<boolean>(false)

  useEffect(() => {
    setIsLogged(!!getToken());
  }, []);

  const classnameHeader = MergeClassnames(dpStyles.Header, classname)

  const closeNav = useCallback(() => setOpenNav(false), [])

  // Fechar menu ao clicar fora
  useEffect(() => {
    if (!openNav) return
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const nav = document.getElementById("header-nav")
      const toggle = document.getElementById("header-nav-toggle")
      if (nav && !nav.contains(target) && toggle && !toggle.contains(target)) {
        setOpenNav(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [openNav])


  return (
    <Box
      className={classnameHeader}
    >
        <Flex onClick={() => navigate(ApiRoutes.Home)} className={dpStyles.logoContainer}>
          <Logo/>
          <h1 > Causa Solidária </h1>
        </Flex>
        
        <Flex className={dpStyles.loginButtonsContainer}>
          {isLogged === false &&  [
              {label: "Entrar", link: ApiRoutes.Login },
              {label: "Cadastrar", link: ApiRoutes.Cadastro}
            ].map(({label, link}, index) => (
              <Box
                className={dpStyles.loginButtom}
                key={index}
                role="button"
                aria-label={label}
                tabIndex={0}
                onClick={() => navigate(link)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(link);
                  }
                }}
              >
                <h2>{label}</h2>
              </Box>
            ))}
            <Box
              id="header-nav-toggle"
              className={dpStyles.navbutton}
              role="button"
              aria-haspopup="menu"
              aria-controls="header-nav"
              aria-expanded={openNav}
              aria-label={openNav ? "Fechar menu de navegação" : "Abrir menu de navegação"}
              tabIndex={0}
              onClick={()=>{setOpenNav(!openNav)}}
              onKeyDown={(e)=>{
                if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenNav(!openNav) }
                if(e.key === 'Escape') { setOpenNav(false) }
              }}
            />
        </Flex>

      <Nav open={openNav} onClose={closeNav} classname={""} />
    </Box>
  )
}

export default Header
