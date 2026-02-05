"use client";

import { useState } from "react";
import { PopupContext, popupType } from "csa/components/ProviderPopup/utils";
import { Box, Heading } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion"

export default function ProviderPopup(
    {
        timeout, 
        children
    }:{
        timeout?: number | undefined, 
        children: React.ReactNode
    },
){
    
    
    const [pilha, setPilha] = useState < popupType[] > ([])
    const time = timeout || 3000




    function AlertPopup(mensagem: string){
        const Novo_popup = {
            id: Date.now(), 
            mensagem: mensagem 
        }

        setPilha(prev => [...prev, Novo_popup])

        setTimeout(() => {
            setPilha( prev => prev.filter(p => p.id !== Novo_popup.id))
        }, time);
        console.log(mensagem)
    }

    
    
    return (

        <PopupContext.Provider value={{AlertPopup}} >
            
            {/* Renderiza o overlay somente quando há popups, evitando bloquear cliques quando vazio */}
            {pilha.length > 0 && (
                <Box 
                    position={"fixed"} 
                    display={"flex"}
                    flexDirection={"column"}
                    zIndex={9999} 
                    p={5} 
                    top={0}
                    left={0}
                    right={0}
                    pointerEvents={"none"} /* Não captura cliques; filhos específicos podem reativar */
                    alignItems={"center"}
                >
                    <AnimatePresence>
                    {
                        pilha.map(
                            popup=>(
                                <motion.div
                                    key={popup.id}
                                    initial={{ opacity: 0, y: -50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    transition={{ duration: 0.4 }}
                                    style={{pointerEvents: "auto", marginBottom: "10px"}} /* Este elemento pode receber eventos se necessário */
                                >
                                    <Box 
                                        bg={"qui"} 
                                        pointerEvents={"auto"}
                                        minW={"300px"}
                                        maxW={"500px"}
                                        borderRadius={"15px"}
                                        p={4}
                                        boxShadow={"0 4px 20px rgba(0,0,0,0.15)"}
                                        display={"flex"}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                    >
                                        <Heading 
                                            fontFamily="quicksand" 
                                            fontWeight={900} 
                                            color={"ter"}
                                            fontSize={"md"}
                                            textAlign={"center"}
                                        >
                                            {popup.mensagem}
                                        </Heading>
                                    </Box>
                                </motion.div>
                            )
                        )
                    }
                    </AnimatePresence>
                </Box>
            )}
            
            {children}
        
        </PopupContext.Provider>

    )
}