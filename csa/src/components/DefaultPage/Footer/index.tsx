import Flex from "csa/components/ui/Flex";
import Heading from "csa/components/ui/heading";
import styles from "../Defaultpage.module.css";

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

/** Tipo para link com texto */
interface FooterTextLink {
    title: string;
    link: string;
    src?: never;
}

/** Tipo para link com imagem (redes sociais) */
interface FooterImageLink {
    src: string;
    link: string;
    title?: never;
}

type FooterLink = FooterTextLink | FooterImageLink;

interface FooterSection {
    title: string;
    links: FooterLink[];
}

const FooterContent: FooterSection[] = [
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
    return (
        <footer className={styles.footer}>
            <Heading className={styles.footerTitle}>Causa Solidaria</Heading>
            <Heading className={styles.footerSubtitle}>
                Conectando pessoas e ONGs em ações que transformam vidas
            </Heading>
            
            <div className={styles.footerContent}>
                {FooterContent.map((Topico, id) => (
                    <div key={id} className={styles.footerSection}>
                        <Heading className={styles.footerSectionTitle}>
                            {Topico.title}
                        </Heading>
                        {Topico.links.map((link: FooterLink, linkId: number) => (
                            <div key={linkId}>
                                {link.title && (
                                    <a href={link.link} className={styles.footerLink}>
                                        {link.title}
                                    </a>
                                )}
                                {link.src && (
                                    <a href={link.link} target="_blank" rel="noopener noreferrer">
                                        <Image
                                            src={link.src}
                                            alt={"social-" + linkId}
                                            className={styles.footerSocialIcon}
                                        />
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            
            <div className={styles.footerSeparador} />
            <Heading className={styles.footerCopyright}>
                © 2025 Causa Solidária ─ Todos os Direitos Reservados
            </Heading>
        </footer>
    )
}