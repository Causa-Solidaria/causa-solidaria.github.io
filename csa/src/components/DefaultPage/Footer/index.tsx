import Flex from "csa/components/ui/Flex";
import Heading from "csa/components/ui/heading";
import styles from "../Defaultpage.module.css";
import { FaInstagram } from "react-icons/fa";
import useNavigate from "csa/hooks/useNavigate";

import {
    Home , 
    Contatos, 
    PoliticasDePrivacidade, 
    TermosDeUso,
    Campanhas,
    ONGs,
    Fóruns
} from "csa/Rotas.json"


/** Tipo para link com texto */
interface FooterTextLink {
    title: string;
    link: string;
    icon?: never;
}

/** Tipo para link com ícone (redes sociais) */
interface FooterIconLink {
    icon: React.ReactNode;
    link: string;
    title?: never;
}

type FooterLink = FooterTextLink | FooterIconLink;

interface FooterSection {
    title: string;
    links: FooterLink[];
}

const FooterContent: FooterSection[] = [
    {
        title: "Institucional",
        links:[
            {title: "Sobre", link: Home},
            {title: "Contato", link: Contatos},
            {title: "Política de Privacidade", link: PoliticasDePrivacidade},
            {title: "Termos de uso", link: TermosDeUso},
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
           {icon: <FaInstagram />, link: "https://www.instagram.com/causasolidaria2025/"}
        ]
    },
    
]



export default function Footer() {
    const { navigate } = useNavigate();

    return (
        <footer className={styles.footer}>
            <Heading className={styles.footerTitle}>Causa Solidária</Heading>
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
                                    <button
                                        type="button"
                                        className={`${styles.footerLink} ${styles.footerLinkButton}`}
                                        onClick={() => navigate(link.link)}
                                    >
                                        {link.title}
                                    </button>
                                )}
                                {link.icon && (
                                    <a href={link.link} target="_blank" rel="noopener noreferrer" className={styles.footerSocialIcon} aria-label="Instagram da Causa Solidária">
                                        {link.icon}
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