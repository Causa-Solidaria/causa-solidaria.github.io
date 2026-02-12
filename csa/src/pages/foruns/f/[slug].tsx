import DefaultPage from "csa/components/DefaultPage"
import Head from "next/head"
import Rotas from "csa/Rotas.json"
import useNavigate from "csa/hooks/useNavigate"
import { FiArrowLeft } from "react-icons/fi"
import styles from "./forum.module.css"

type ForumProps = {
    id: string
    titulo: string
    descricao?: string
    notFound: boolean
}

export default function Forum(f: ForumProps) {
    const { navigate } = useNavigate()

    if (f.notFound) {
        return (
            <DefaultPage>
                <div className={styles.container}>
                    <div className={styles.notFound}>
                        <h2 className={styles.notFoundTitle}>Não existe este fórum</h2>
                        <button
                            className={styles.notFoundButton}
                            onClick={() => navigate(Rotas.Fóruns.Home)}
                        >
                            Procurar outros
                        </button>
                    </div>
                </div>
            </DefaultPage>
        )
    }

    return (
        <DefaultPage>
            <Head>
                <title>{f.titulo}</title>
            </Head>

            <div className={styles.container}>
                <button
                    className={styles.backButton}
                    onClick={() => navigate(Rotas.Fóruns.Home)}
                >
                    <FiArrowLeft />
                    Voltar
                </button>

                <div className={styles.card}>
                    <h1 className={styles.title}>{f.titulo}</h1>
                    {f.descricao && (
                        <p className={styles.description}>{f.descricao}</p>
                    )}
                </div>
            </div>
        </DefaultPage>
    )
}

export const getServerSideProps = async (context: any) => {
    const slug = context.params?.slug as string

    const mockData = {
        id: "1",
        titulo: "Fórum Exemplo",
        descricao: "Descrição do fórum exemplo.",
        notFound: false,
    }

    if (!slug) {
        return { props: { notFound: true } as ForumProps }
    }

    return { props: mockData }
}
