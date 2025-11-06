"use client"


// tipos que o botão pode ser
export type Botao = 
    | { tipo: "custom"; componente: React.ReactNode} 
    | { tipo: "link"; href: string; text: string }

