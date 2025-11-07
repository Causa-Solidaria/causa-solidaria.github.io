
import Flex from "csa/components/ui/Flex";
import Heading from "csa/components/ui/heading";
import Separador from "csa/components/ui/separador";
import JustifyFull, { AlignFull } from "csa/utils/JustifyFullCenter";
import { SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/utils/staticPosition";



const FooterContent: any[] = [
    {
        title: "institucional",
        links:[
            {title: "sobre", link: "/"},
            {title: "Contato", link: "/contato"},
            {title: "Politica de Privacidade", link: "/politicaDePrivacidade"},
            {title: "termos de uso", link: "/termosDeUso"},
        ]
    },
    {
        title: "Participe",
        links:[
            {title: "Doe agora", link: "/campanhas"},
            {title: "ONGs", link: "/ongs"},
            {title: "Crie uma campanha", link: "/criar_campanha"},
        ]
    },
    {
        title: "Siga-nos",
        links:[
        ]
    },
    
]



export default function Footer() {
    return (
        <>
            <Flex
                dir={"column"}
                bg={"#1F5E43"}
                padding={staticPosition(1, 7)}
                gapY={staticPosition(25, 2935)}
                {...SetStaticPositionH(740, 2935)}
                {...SetStaticPositionW("full" , 2935)}
                {...JustifyFull()}
                {...AlignFull()}
            >
                <Heading fontSize={75} p={staticPosition(10)} > Causa Solidaria</Heading>
                <Heading fontSize={48}>Conectando pessoas e ONGs em ações que transformam vidas</Heading>
                <Flex 
                    dir="row" 
                    m={staticPosition(20)} 
                    p={staticPosition(20)} 
                    gapX={staticPosition(5)}
                >
                    {FooterContent.map(
                        (Topico, id)=>(
                            <Flex 
                                key={id} 
                                dir="column" 

                                gapY={staticPosition(10, 2935)}
                                {...SetStaticPositionW(615, 2935)}
                            >
                                <Heading fontSize={75} textAlign={"left"}> {Topico.title} </Heading>
                                {
                                    Topico.links.map((link, id)=>(
                                        <a href={link.link} key={id}>
                                            <Heading
                                                fontSize={32}
                                                textAlign={"left"}
                                                transition={"0.6s all easy"}
                                                _hover={
                                                    {
                                                        color: "sec"
                                                    }
                                                }
                                            >
                                                {link.title}
                                            </Heading>
                                        </a>
                                    ))
                                }

                            </Flex>
                        )
                    )}
                </Flex>
                <Separador size={615*FooterContent.length} color={"#fff"} maxsize={2935}/>
                <Heading>© 2025 Causa Solidária ─Todos os Direitos Reservados</Heading>
            </Flex>
        </>
    )
}