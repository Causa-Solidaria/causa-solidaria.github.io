import DefaultPage from "csa/components/DefaultPage"
import { GetServerSideProps } from "next"
import { prisma } from "csa/lib/prisma"
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import Rotas from "csa/Rotas.json"
import useNavigate from "csa/hooks/useNavigate"
import { FiMapPin, FiCalendar, FiArrowLeft, FiPhone, FiMail } from "react-icons/fi"
import styles from "./slug.module.css"
import { Breadcrumb } from "csa/components/ui"
import { CampanhaDetail, mockCampanhaDetail } from "csa/mocks/campanhas"

type CampanhaProps = CampanhaDetail

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
}

function formatCurrency(value: number): string {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
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
    const meta = c.meta ?? 5000
    const arrecadado = c.arrecadado ?? Math.round(meta * (c.nivelAjuda / 5) * 0.65)
    const progresso = meta > 0 ? Math.min((arrecadado / meta) * 100, 100) : 0
    const telefone = c.telefone ?? "(84) 9 1234-5678"
    const email = c.email ?? "contato@causasolidaria.org"
    const galeria = c.galeria ?? []
    const local = [c.cidade, c.estado].filter(Boolean).join(" - ")

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

    return (
        <DefaultPage>
            <Head>
                <title>{c.titulo}</title>
            </Head>

            <div className={styles.container}>
                <Breadcrumb items={[{ label: "campanhas", href: Rotas.Campanhas.Home }, { label: c.titulo }]} />
                <button
                    className={styles.backButton}
                    onClick={() => navigate(Rotas.Campanhas.Home)}
                    aria-label="Voltar"
                >
                    <FiArrowLeft />
                </button>

                <div className={styles.card}>
                    {/* Hero Image */}
                    <div
                        className={styles.imageWrapper}
                        onClick={() => setExpanded((prev) => !prev)}
                    >
                        <Image
                            className={expanded ? styles.imageExpanded : styles.image}
                            src={fotoSrc}
                            alt={c.titulo}
                            width={960}
                            height={400}
                            unoptimized
                        />
                    </div>

                    <div className={styles.content}>
                        {/* Título e Descrição */}
                        <h1 className={styles.title}>{c.titulo}</h1>
                        {c.descricao && (
                            <p className={styles.description}>{c.descricao}</p>
                        )}

                        {/* Meta e Arrecadação */}
                        <div className={styles.metaSection}>
                            <div className={styles.metaRow}>
                                <span className={styles.metaLabel}>meta: <strong>{formatCurrency(meta)}</strong></span>
                                <span className={styles.metaLabel}>arrecadados: <strong>{formatCurrency(arrecadado)}</strong></span>
                            </div>
                            <div className={styles.progressTrack}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${progresso}%` }}
                                />
                            </div>
                            <span className={styles.progressPercent}>{Math.round(progresso)}%</span>
                        </div>

                        {/* Info: Prazo e Local */}
                        <div className={styles.infoList}>
                            <div className={styles.infoItem}>
                                <FiCalendar className={styles.infoIcon} />
                                <span>Prazo final: <strong>{formatDate(c.endDate)}</strong></span>
                            </div>
                            {local && (
                                <div className={styles.infoItem}>
                                    <FiMapPin className={styles.infoIcon} />
                                    <span>Local: <strong>{local}</strong></span>
                                </div>
                            )}
                        </div>

                        {/* Galeria */}
                        {galeria.length > 0 && (
                            <div className={styles.gallery}>
                                {galeria.map((img, idx) => (
                                    <Image
                                        key={idx}
                                        className={styles.galleryImage}
                                        src={getImageSrc(img)}
                                        alt={`Foto ${idx + 1}`}
                                        width={120}
                                        height={90}
                                        unoptimized
                                    />
                                ))}
                            </div>
                        )}

                        {/* Contato */}
                        <div className={styles.contactSection}>
                            <div className={styles.contactItem}>
                                <FiPhone className={styles.infoIcon} />
                                <span>{telefone}</span>
                            </div>
                            <div className={styles.contactItem}>
                                <FiMail className={styles.infoIcon} />
                                <span>{email}</span>
                            </div>
                        </div>

                        {/* Botão Doar */}
                        <button className={styles.donateButton}>
                            DOAR AGORA
                        </button>
                    </div>
                </div>
            </div>
        </DefaultPage>
    )
}

const USE_TEST_DATA = true

export const getServerSideProps: GetServerSideProps = async (context) => {
    const slug = context.params?.slug as string

    const campanha = USE_TEST_DATA
        ? mockCampanhaDetail
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