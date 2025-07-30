import { useState} from "react";
import { PopupContext, popupType } from "./utils";
import { Box,  Center,  Heading,  Text } from "@chakra-ui/react";
import CardDefault from "../Card";
import { AnimatePresence, motion } from "framer-motion"


const PopupCard = motion(CardDefault)

export default function ProviderPopup({timeout, children}:{timeout?: number | undefined, children: React.ReactNode}){
    const [pilha, setPilha] = useState < popupType[] > ([])
    const time = timeout || 3000

    function AlertPopup(mensagem){
        const Novo_popup = {id: Date.now(), mensagem: mensagem }
        setPilha(prev => [...prev, Novo_popup])

        setTimeout(() => {
            setPilha( prev => prev.filter(p => p.id !== Novo_popup.id))
        }, time);
    }

    return (

        <PopupContext.Provider value={{AlertPopup}} >
            
            <Box position={"fixed"} zIndex={9999} p={5} justifySelf={"center"} justifyContent={"center"} justifyItems={"center"} >
                <AnimatePresence>
                {
                    pilha.map(
                        popup=>(
                            <PopupCard key={popup.id}  
                                width="350px" minH={"25px"} 
                                bg={"qui"} 
                                mb={5} justifyItems={"center"} textAlign={"center"} 
                                borderRadius={"15px"}                  
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -40 }}
                                transition={{ duration: 0.6 }}
                                layout 
                            >
                                <Heading fontFamily="quicksand" fontWeight={900} color={"ter"}>
                                    {popup.mensagem}
                                </Heading>
                            </PopupCard>
                        )
                    )
                }
                </AnimatePresence>
            </Box>
            
            {children}
        
        </PopupContext.Provider>

    )
}