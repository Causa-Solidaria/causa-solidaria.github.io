import DefaultPage from "csa/components/DefaultPage"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { prisma } from "csa/lib/prisma"
import Rotas from "csa/Rotas.json"
import useNavigate from "csa/hooks/useNavigate"
import { FiArrowLeft, FiMapPin, FiCalendar, FiPhone, FiMail, FiGlobe, FiUsers } from "react-icons/fi"
import { LuBuilding2, LuMegaphone } from "react-icons/lu"
import { Image } from "@chakra-ui/react"
import { Badge, Breadcrumb, Button, Flex } from "csa/components/ui"
import Modal from "csa/components/ui/Modal"
import styles from "./slug.module.css"
import { OngDetail, mockOngsDetail } from "csa/mocks/ongs"

const { ONGs } = Rotas

type OngProps = OngDetail

export default function OngPage(ong: OngProps) {
    const { navigate } = useNavigate()
    const router = useRouter()
    // sometimes the component is rendered in tests without a router query
    const slug = (router.query.slug as string) || ong.id

    const [isModalOpen, setModalOpen] = useState(false)
    const [choice, setChoice] = useState<'ir' | 'doar' | ''>('')

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

    // build a more complete address if street/number/bairro exist
    const addressParts: string[] = []
    if (ong.rua) {
      addressParts.push(ong.rua + (ong.numero ? `, ${ong.numero}` : ""))
    }
    if (ong.bairro) {
      addressParts.push(ong.bairro)
    }
    const fullAddress = [...addressParts, local].filter(Boolean).join(" - ")

    const handleAdvance = () => {
        setModalOpen(false)
        if (choice === 'ir') {
            navigate(ONGs.voluntariar + slug)
        } else if (choice === 'doar') {
            navigate(ONGs.doar + slug)
        }
    }

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
                    {/* Header with logo or icon */}
                    {ong.logoUrl ? (
                        <div className={`${styles.cardHeader} ${styles.cardHeaderWithImage}`}>
                            <Image
                                src={ong.logoUrl.startsWith("data:") ? ong.logoUrl : `data:image/png;base64,${ong.logoUrl}`}
                                alt={`Logo ${ong.nome}`}
                                className={styles.cardHeaderImage}
                            />
                        </div>
                    ) : (
                        <div className={`${styles.cardHeader} ${styles.cardHeaderFallback}`}>
                            <div className={styles.cardIcon}>
                                <LuBuilding2 className={styles.cardIconInner} />
                            </div>
                        </div>
                    )}

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
                                    <span><strong>{fullAddress}</strong></span>
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
                            <button
                                className={styles.primaryButton}
                                onClick={() => setModalOpen(true)}
                            >
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

            {/* escolha modal */}
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Como deseja ajudar?">
                <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                <input
                  type="radio"
                  name="helpChoice"
                  value="ir"
                  checked={choice === 'ir'}
                  onChange={() => setChoice('ir')}
                />{' '}
                Posso ir até a ONG
              </label>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                <input
                  type="radio"
                  name="helpChoice"
                  value="doar"
                  checked={choice === 'doar'}
                  onChange={() => setChoice('doar')}
                />{' '}
                Quero ajudar com doação de itens
              </label>
            </fieldset>
                <Flex style={{ justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <Button onClick={handleAdvance} disabled={!choice}>Avançar</Button>
                </Flex>
            </Modal>
        </DefaultPage>
    )
}

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true"

export const getServerSideProps: GetServerSideProps = async (context) => {
    const slug = context.params?.slug as string

    if (USE_MOCK) {
        const ong = mockOngsDetail[slug] ?? null

        if (!ong) {
            return { props: { notFound: true } as unknown as OngProps }
        }

        return { props: ong }
    }

    // ao executar contra o banco de dados real precisamos fazer uma consulta
    // o ID armazenado no Prisma é um inteiro, então primeiro detecta se o slug
    // parece um número; caso contrário, trata como uma busca por nome (decodificado).
    const isNumber = /^\d+$/.test(slug)
    const dbOng = isNumber
        ? await prisma.ong.findUnique({ where: { id: parseInt(slug, 10) } })
        : await prisma.ong.findFirst({ where: { nome: decodeURIComponent(slug) } })

    if (!dbOng) {
        return { props: { notFound: true } as OngProps }
    }

    return {
        props: {
            id: dbOng.id.toString(),
            nome: dbOng.nome,
            area: dbOng.areaAtuacao,
            descricao: dbOng.descricao,
            cidade: dbOng.cidade ?? "",
            uf: dbOng.uf ?? "",
            email: dbOng.contato,
            telefone: "",
            rua: dbOng.rua ?? "",
            numero: dbOng.numero ?? "",
            bairro: dbOng.bairro ?? "",
            site: dbOng.siteOuRede ?? "",
            logoUrl: dbOng.logoUrl ?? "",
            fundacao: "",
            missao: "",
            voluntarios: 0,
            campanhasAtivas: 0,
            notFound: false,
        },
    }
}
