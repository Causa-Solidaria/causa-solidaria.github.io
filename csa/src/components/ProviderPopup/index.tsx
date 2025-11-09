"use client";

import { useState } from "react";
import { PopupContext, popupType } from "csa/components/ProviderPopup/utils";
import { Box, Heading } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion"
import JustifyFull, { AlignFull } from "csa/utils/JustifyFullCenter";
import { SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/utils/staticPositions";


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
    }

    
    
    return (

        <PopupContext.Provider value={{AlertPopup}} >
            
            {/* Renderiza o overlay somente quando há popups, evitando bloquear cliques quando vazio */}
            {pilha.length > 0 && (
                <Box 
                    position={"fixed"} 
                    display={"flex"}
                    zIndex={9999} 
                    p={5} 
                    top = {0}
                    pointerEvents={"none"} /* Não captura cliques; filhos específicos podem reativar */
                    {...SetStaticPositionH("full")}
                    {...SetStaticPositionW("full")}
                    {...JustifyFull("center")}
                    {...AlignFull("center")}
                >
                    <AnimatePresence>
                    {
                        pilha.map(
                            popup=>(
                                <motion.div
                                    key={popup.id}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -40 }}
                                    transition={{ duration: 0.6 }}
                                    style={{pointerEvents: "auto"}} /* Este elemento pode receber eventos se necessário */
                                    {...JustifyFull("center")}
                                    {...AlignFull("center")}
                                >
                                    <Box 
                                        bg={"qui"} 
                                        mb={5} 
                                        pointerEvents={"auto"}
                                        {...SetStaticPositionW(350)}
                                        {...SetStaticPositionH(150)}
                                        borderRadius={"15px"}
                                        p={staticPosition(15)}         
                                    >
                                        <Heading fontFamily="quicksand" fontWeight={900} color={"ter"}>
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