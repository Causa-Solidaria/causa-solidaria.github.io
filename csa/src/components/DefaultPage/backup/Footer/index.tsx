import Flex from "csa/components/ui/Flex";
import Heading from "csa/components/ui/heading";
import Separador from "csa/components/ui/separador";

import {
    Home , 
    Contatos, 
    PoliticasDePrivacidade, 
    TermosDeUso,
    Campanhas,
    ONGs,
    Fóruns
} from "csa/Rotas.json"

import { Image } from "@chakra-ui/react";


const FooterContent: any[] = [
    {
        title: "institucional",
        links:[
            {title: "sobre", link: Home},
            {title: "Contato", link: Contatos},
            {title: "Politica de Privacidade", link: PoliticasDePrivacidade},
            {title: "termos de uso", link: TermosDeUso},
        ]
    },
    {
        title: "Participe",
        links:[
            {title: "Doe agora", link: Campanhas.Home},
            {title: "ONGs", link: ONGs.Home},
            {title: "Veja nossos Fóruns", link: Fóruns.Home},
        ]
    },
    {
        title: "Siga-nos",
        links:[
           {src: "pngwing.com (13) 1.svg", link: "https://www.instagram.com/causasolidaria2025/"}
        ]
    },
    
]



export default function Footer() {
    
    ///esses são os helpers

    return (
        <>
            <Flex
                dir={"column"}
                bg={"#1F5E43"}
                padding={"20vmax"}
                gap={"1vmax"}
            >
                <Heading fontSize={"4vmax"} p={"1vmax"} > Causa Solidaria</Heading>
                <Heading fontSize={"2vmax"} >Conectando pessoas e ONGs em ações que transformam vidas</Heading>
                <Flex 
                    dir="row" 
                    m={"1vmax"} 
                    p={"1vmax"} 
                    gap={"4vmax"}
                >
                    {FooterContent.map(
                        (Topico, id)=>(
                            <Flex 
                                key={id} 
                                dir="column" 

                                gap={"0.5vmax"}
                                minW={"1vmax"}
                            >
                                <Heading fontSize={"3vmax"} textAlign={"left"} my={"3vmax"}> {Topico.title} </Heading>
                                {
                                    Topico.links.map((link: any, id: number)=>(<>
                                            {link.title 
                                                ? <a href={link.link} key={id}>
                                                <Heading
                                                    fontSize={"1.5vmax"}
                                                    textAlign={"left"}
                                                    color="#fff"
                                                    transition={"0.6s all easy"}
                                                    _hover={
                                                        {
                                                            color: "sec"
                                                        }
                                                    }
                                                >
                                                    {link.title}
                                                </Heading>
                                            </a> : null}
                                            {link.src 
                                                ? <a href={link.link} key={id}>
                                                <Image
                                                    src={link.src}
                                                    alt={"imag"+id}
                                                />
                                            </a> : null}

                                        </>
                                    ))
                                }

                            </Flex>
                        )
                    )}
                </Flex>
                <Separador size={615*FooterContent.length} color={"#fff"} maxsize={2935}/>
                <Heading color="#fff">© 2025 Causa Solidária ─Todos os Direitos Reservados</Heading>
            </Flex>
        </>
    )
}