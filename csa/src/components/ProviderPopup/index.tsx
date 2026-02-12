"use client";

import { useState } from "react";
import { PopupContext, popupType } from "csa/components/ProviderPopup/utils";
import { AnimatePresence, motion } from "framer-motion"
import styles from "./ProviderPopup.module.css"

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
                <div className={styles.overlay}>
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
                                    className={styles.popupWrapper}
                                >
                                    <div className={styles.popupBox}>
                                        <span className={styles.popupText}>
                                            {popup.mensagem}
                                        </span>
                                    </div>
                                </motion.div>
                            )
                        )
                    }
                    </AnimatePresence>
                </div>
            )}
            
            {children}
        
        </PopupContext.Provider>

    )
}