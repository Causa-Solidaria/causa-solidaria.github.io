import DefaultPage from "csa/components/DefaultPage"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Rotas from "csa/Rotas.json"
import useNavigate from "csa/hooks/useNavigate"
import { FiArrowLeft, FiMapPin, FiCalendar, FiPhone, FiMail, FiGlobe, FiUsers } from "react-icons/fi"
import { LuBuilding2, LuMegaphone } from "react-icons/lu"
import { Badge, Breadcrumb } from "csa/components/ui"
import styles from "./slug.module.css"
import { OngDetail, mockOngsDetail, mockOngDefault } from "csa/mocks/ongs"

const { ONGs } = Rotas

type OngProps = OngDetail

export default function OngPage(ong: OngProps) {
    const { navigate } = useNavigate()

    if (ong.notFound) {
        return (
            <DefaultPage>
                <div className={styles.container}>
                    <div className={styles.notFound}>
                        <h2 className={styles.notFoundTitle}>Essa ONG não foi encontrada</h2>
                        <button
                            className={styles.notFoundButton}
                            onClick={() => navigate(ONGs.Home)}
                        >
                            Ver todas as ONGs
                        </button>
                    </div>
                </div>
            </DefaultPage>
        )
    }

    const local = [ong.cidade, ong.uf].filter(Boolean).join(" - ")

    return (
        <DefaultPage>
            <Head>
                <title>{ong.nome} — Causa Solidária</title>
            </Head>

            <div className={styles.container}>
                <Breadcrumb items={[{ label: "ongs", href: ONGs.Home }, { label: ong.nome }]} />
                <button
                    className={styles.backButton}
                    onClick={() => navigate(ONGs.Home)}
                    aria-label="Voltar"
                >
                    <FiArrowLeft />
                </button>

                <div className={styles.card}>
                    {/* Header with icon */}
                    <div className={styles.cardHeader}>
                        <div className={styles.cardIcon}>
                            <LuBuilding2 className={styles.cardIconInner} />
                        </div>
                    </div>

                    <div className={styles.content}>
                        {/* Nome e Área */}
                        <h1 className={styles.title}>{ong.nome}</h1>
                        <div className={styles.areaBadge}>
                            <Badge>{ong.area}</Badge>
                        </div>

                        {/* Descrição */}
                        {ong.descricao && (
                            <p className={styles.description}>{ong.descricao}</p>
                        )}

                        {/* Missão */}
                        {ong.missao && (
                            <div className={styles.missionSection}>
                                <span className={styles.missionLabel}>Nossa Missão</span>
                                <p className={styles.missionText}>&ldquo;{ong.missao}&rdquo;</p>
                            </div>
                        )}

                        {/* Estatísticas */}
                        <div className={styles.statsSection}>
                            {ong.voluntarios > 0 && (
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>{ong.voluntarios}</span>
                                    <span className={styles.statLabel}>Voluntários</span>
                                </div>
                            )}
                            {ong.campanhasAtivas > 0 && (
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>{ong.campanhasAtivas}</span>
                                    <span className={styles.statLabel}>Campanhas</span>
                                </div>
                            )}
                            {ong.fundacao && (
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>{ong.fundacao}</span>
                                    <span className={styles.statLabel}>Fundação</span>
                                </div>
                            )}
                        </div>

                        <hr className={styles.divider} />

                        {/* Informações */}
                        <div className={styles.infoList}>
                            {local && (
                                <div className={styles.infoItem}>
                                    <FiMapPin className={styles.infoIcon} />
                                    <span><strong>{local}</strong></span>
                                </div>
                            )}
                            {ong.fundacao && (
                                <div className={styles.infoItem}>
                                    <FiCalendar className={styles.infoIcon} />
                                    <span>Fundada em <strong>{ong.fundacao}</strong></span>
                                </div>
                            )}
                        </div>

                        {/* Contato */}
                        <div className={styles.contactSection}>
                            {ong.telefone && (
                                <div className={styles.contactItem}>
                                    <FiPhone className={styles.infoIcon} />
                                    <span>{ong.telefone}</span>
                                </div>
                            )}
                            <div className={styles.contactItem}>
                                <FiMail className={styles.infoIcon} />
                                <span>{ong.email}</span>
                            </div>
                            {ong.site && (
                                <div className={styles.contactItem}>
                                    <FiGlobe className={styles.infoIcon} />
                                    <a
                                        className={styles.contactLink}
                                        href={ong.site}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {ong.site.replace(/^https?:\/\//, "")}
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Botões */}
                        <div className={styles.buttonRow}>
                            <button className={styles.primaryButton}>
                                <FiUsers /> VOLUNTARIAR-SE
                            </button>
                            <button
                                className={styles.secondaryButton}
                                onClick={() => navigate(Rotas.Campanhas.Home)}
                            >
                                <LuMegaphone /> Ver Campanhas
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultPage>
    )
}

const USE_TEST_DATA = true

export const getServerSideProps: GetServerSideProps = async (context) => {
    const slug = context.params?.slug as string

    if (USE_TEST_DATA) {
        const ong = mockOngsDetail[slug] ?? null

        if (!ong) {
            return { props: { notFound: true } as unknown as OngProps }
        }

        return { props: ong }
    }

    // TODO: fetch real ONG from database
    const ong = mockOngDefault
    return { props: { ...ong, notFound: true } as OngProps }
}
