import DefaultPage from "csa/components/DefaultPage"
import { GetServerSideProps } from "next"
import { prisma } from "csa/lib/prisma"
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import Rotas from "csa/Rotas.json"
import useNavigate from "csa/hooks/useNavigate"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames"
import { FiMapPin, FiCalendar, FiArrowLeft } from "react-icons/fi"
import styles from "./slug.module.css"

type CampanhaProps = {
    id: string
    titulo: string
    descricao?: string
    nivelAjuda: number
    cep: string
    estado: string
    bairro: string
    rua: string
    numero: string
    foto: string
    createdAt: string
    endDate: string
    notFound: boolean
}

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
}

function getImageSrc(foto?: string): string {
    if (!foto || foto.length === 0) return "/logo.png"
    if (foto.startsWith("data:") || foto.startsWith("http") || foto.startsWith("/")) {
        return foto
    }
    return `data:image/*;base64,${foto}`
}

export default function Campanha(c: CampanhaProps) {
    const { navigate } = useNavigate()
    const [expanded, setExpanded] = useState(false)

    const fotoSrc = getImageSrc(c.foto)

    if (c.notFound) {
        return (
            <DefaultPage>
                <div className={styles.container}>
                    <div className={styles.notFound}>
                        <h2 className={styles.notFoundTitle}>Não existe essa campanha</h2>
                        <button
                            className={styles.notFoundButton}
                            onClick={() => navigate(Rotas.Campanhas.Home)}
                        >
                            Procurar por outras
                        </button>
                    </div>
                </div>
            </DefaultPage>
        )
    }

    const endereco = [c.rua, c.numero, c.bairro, c.estado, c.cep]
        .filter(Boolean)
        .join(", ")

    return (
        <DefaultPage>
            <Head>
                <title>{c.titulo}</title>
            </Head>

            <div className={styles.container}>
                <button
                    className={styles.backButton}
                    onClick={() => navigate(Rotas.Campanhas.Home)}
                >
                    <FiArrowLeft />
                    Voltar
                </button>

                <div className={styles.card}>
                    <div
                        className={styles.imageWrapper}
                        onClick={() => setExpanded((prev) => !prev)}
                    >
                        <Image
                            className={MergeClassnames(
                                styles.image,
                                expanded ? styles.imageExpanded : ""
                            )}
                            src={fotoSrc}
                            alt={c.titulo}
                            width={960}
                            height={400}
                            unoptimized
                        />
                    </div>

                    <div className={styles.content}>
                        <h1 className={styles.title}>{c.titulo}</h1>

                        {c.descricao && (
                            <p className={styles.description}>{c.descricao}</p>
                        )}

                        <div className={styles.helpLevel}>
                            <span className={styles.helpLevelLabel}>
                                Nível de ajuda: {c.nivelAjuda}/5
                            </span>
                            <div className={styles.progressTrack}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${(c.nivelAjuda / 5) * 100}%` }}
                                />
                            </div>
                        </div>

                        {endereco && (
                            <div className={styles.infoSection}>
                                <div className={styles.infoItem}>
                                    <FiMapPin className={styles.infoIcon} />
                                    <span>
                                        <span className={styles.infoLabel}>Endereço:</span>
                                        {endereco}
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className={styles.dates}>
                            <span className={styles.dateItem}>
                                <FiCalendar />
                                <span className={styles.dateLabel}>Criado em:</span>
                                {formatDate(c.createdAt)}
                            </span>
                            <span className={styles.dateItem}>
                                <FiCalendar />
                                <span className={styles.dateLabel}>Encerra em:</span>
                                {formatDate(c.endDate)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultPage>
    )
}

const USE_TEST_DATA = true

const testCampanha = {
    id: "test-001",
    titulo: "Campanha de Teste",
    descricao: "Esta é uma campanha de teste para visualização do layout.",
    nivelAjuda: 3,
    cep: "01001-000",
    estado: "SP",
    bairro: "Centro",
    rua: "Rua Exemplo",
    numero: "123",
    foto: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    notFound: false,
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const slug = context.params?.slug as string

    const campanha = USE_TEST_DATA
        ? testCampanha
        : await (async () => {
            const isUuid = /^[0-9a-fA-F-]{36}$/.test(slug)
            return isUuid
                ? await prisma.campanha.findUnique({ where: { id: slug } })
                : (await prisma.campanha.findMany({ where: { titulo: decodeURIComponent(slug) } }))[0]
        })()

    if (!campanha) {
        return { props: { notFound: true } as CampanhaProps }
    }

    return {
        props: {
            id: campanha.id,
            titulo: campanha.titulo,
            descricao: campanha.descricao ?? "",
            nivelAjuda: campanha.nivelAjuda,
            cep: campanha.cep,
            estado: campanha.estado ?? "",
            bairro: campanha.bairro ?? "",
            rua: campanha.rua,
            numero: campanha.numero,
            foto: campanha.foto ? campanha.foto : "",
            createdAt: typeof campanha.createdAt === "string" ? campanha.createdAt : campanha.createdAt.toISOString(),
            endDate: typeof campanha.endDate === "string" ? campanha.endDate : campanha.endDate.toISOString(),
            notFound: false,
        },
    }
}