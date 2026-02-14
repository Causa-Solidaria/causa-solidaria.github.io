'use client'

import DefaultPage from "csa/components/DefaultPage"
import { Badge, Avatar, EmptyState, Breadcrumb } from "csa/components/ui"
import Heading from "csa/components/ui/heading"
import { getToken } from "csa/lib/utils"
import { useForm } from "react-hook-form"
import { Fóruns, Perfil } from "csa/Rotas.json"
import { useState } from "react"
import { AiOutlineLike } from "react-icons/ai"
import { MdOutlineMessage } from "react-icons/md"
import { LuMessageSquare } from "react-icons/lu"
import useNavigate from "csa/hooks/useNavigate"
import styles from "./foruns.module.css"

interface ForumData {
    UUID: string
    _id: string | number
    Titulo: string
    Descrição: string
    Joinhas: number
    Foto: string
    Tags?: { label: string; color?: string }[]
    NumeroDeComentarios?: number
    Criador: { nome: string; foto?: string }
    EmAlta?: boolean
    Data: string
}

export default function Foruns() {
    const { navigate } = useNavigate()
    const Token = getToken()
    const { register } = useForm()

    const [foruns, setForuns] = useState<ForumData[]>([
        {
            _id: 0,
            UUID: "asdasda",
            Titulo: "test de Foruns 1",
            Descrição: "isso é um test",
            Joinhas: 2,
            Foto: "",
            Criador: { nome: "davi" },
            Data: "12/12/1212",
            Tags: [{ label: "test" }],
            EmAlta: true,
        },
        {
            _id: 1,
            UUID: "asdasda",
            Titulo: "test de Foruns 2",
            Descrição: "isso é um test2",
            Joinhas: 1,
            Foto: "",
            Criador: { nome: "inacio gabriel" },
            Data: "12/12/1212",
            Tags: [{ label: "test2" }],
            NumeroDeComentarios: 2,
        },
    ])

    const Search = (event: React.ChangeEvent<HTMLInputElement>) => {}

    return (
        <DefaultPage>
            <div className={styles.page}>
                <Breadcrumb items={[{ label: "fóruns" }]} />

                <div className={styles.container}>
                <div className={styles.header}>
                    <Heading className={styles.pageTitle}>Fóruns</Heading>

                    <div className={styles.searchRow}>
                        <input
                            {...register("Search")}
                            className={styles.searchInput}
                            placeholder="Buscar Tópicos ou Palavra-Chave"
                            onChange={Search}
                        />
                        <button
                            className={styles.createButton}
                            onClick={() => navigate(Fóruns.criar)}
                        >
                            Criar Novo Tópico
                        </button>
                    </div>
                </div>

                {foruns.length === 0 ? (
                    <div className={styles.centerBox}>
                        <EmptyState
                            icon={<LuMessageSquare size={64} />}
                            title="Nenhum fórum encontrado"
                            description="Seja o primeiro a criar um tópico!"
                            action={{
                                label: "Criar Tópico",
                                onClick: () => navigate(Fóruns.criar),
                            }}
                        />
                    </div>
                ) : (
                    <div className={styles.list}>
                        {foruns.map((f, index) => (
                            <div
                                key={index}
                                className={styles.card}
                                onClick={() => navigate(Fóruns.search + f.UUID)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") navigate(Fóruns.search + f.UUID)
                                }}
                            >
                                <div className={styles.cardTop}>
                                    <div className={styles.cardBody}>
                                        <div className={styles.cardTitleRow}>
                                            <h3 className={styles.cardTitle}>{f.Titulo}</h3>
                                            {f.EmAlta && (
                                                <span className={styles.hotBadge}>
                                                    <Badge variant="error" size="lg" rounded>
                                                        🔥 EM ALTA
                                                    </Badge>
                                                </span>
                                            )}
                                        </div>

                                        {f.Tags && f.Tags.length > 0 && (
                                            <div className={styles.cardTags}>
                                                {f.Tags.map((tag, idx) => (
                                                    <Badge key={idx} variant="default" size="sm">
                                                        {tag.label}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}

                                        <p className={styles.cardDescription}>{f.Descrição}</p>
                                    </div>
                                </div>

                                <div className={styles.cardFooter}>
                                    <span
                                        className={styles.footerItem}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            navigate(Perfil.search + f.Criador.nome)
                                        }}
                                    >
                                        <Avatar
                                            src={f.Criador.foto}
                                            name={f.Criador.nome}
                                            size="xs"
                                        />
                                        {f.Criador.nome}
                                    </span>

                                    <span className={styles.footerItem}>
                                        <AiOutlineLike className={styles.footerIcon} />
                                        {f.Joinhas || 0}
                                    </span>

                                    <span className={styles.footerItem}>
                                        <MdOutlineMessage className={styles.footerIcon} />
                                        {f.NumeroDeComentarios || 0}
                                    </span>

                                    <span className={styles.cardDate}>{f.Data}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                </div>
            </div>
        </DefaultPage>
    )
}

