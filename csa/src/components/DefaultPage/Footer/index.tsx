import Flex from "csa/components/ui/Flex";
import Heading from "csa/components/ui/heading";
import Separador from "csa/components/ui/separador";
import JustifyFull, { AlignFull, BorderRadiusStatic, SetStaticPositionH, SetStaticPositionW, shadowStatic, staticPosition } from "csa/lib/utils";

import {
    Home , 
    Contatos, 
    PoliticasDePrivacidade, 
    TermosDeUso,
    Campanhas,
    ONGs,
    Fóruns
} from "csa/Rotas.json"
import Foruns from "csa/pages/foruns";
import { HeadingProps, Image } from "@chakra-ui/react";


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
    const MaxSize = 2940
    const st = (s: number | number[])=>(staticPosition as any)(s, MaxSize)
    const sstW = (w: number | string | (number | string)[] = MaxSize)=>(SetStaticPositionW as any)(w, MaxSize)
    const sstH = (h: number | string | (number | string)[] = MaxSize)=>(SetStaticPositionH as any)(h, MaxSize)
    const bordR = (s: number|string)=>BorderRadiusStatic(s, MaxSize)
    const shSt = (x: number, y: number)=>shadowStatic(x, y, 10, "rgba(0,0,0,0.3)", MaxSize)

    return (
        <>
            <Flex
                dir={"column"}
                bg={"#1F5E43"}
                padding={"20vmax"}
                gap={"1vmax"}
                {...sstH(740)}
                {...sstW("full")}
                {...JustifyFull()}
                {...AlignFull()}
            >
                <Heading fontSize={"4vmax"} p={"1vmax"} level={2}> Causa Solidaria</Heading>
                <Heading fontSize={"2vmax"} level={2}>Conectando pessoas e ONGs em ações que transformam vidas</Heading>
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
                                <Heading fontSize={"3vmax"} textAlign={"left"} level={2} my={"3vmax"}> {Topico.title} </Heading>
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
                                                    {...sstW(32)}
                                                    {...sstH(32)}
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