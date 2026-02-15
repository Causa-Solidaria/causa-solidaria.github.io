'use client'

import DefaultPage from "csa/components/DefaultPage"
import { Badge, Avatar, EmptyState, Breadcrumb } from "csa/components/ui"
import Heading from "csa/components/ui/heading"
import { useForm } from "react-hook-form"
import { Fóruns, Perfil } from "csa/Rotas.json"
import { useState, useMemo } from "react"
import { BiUpvote } from "react-icons/bi"
import { MdOutlineMessage } from "react-icons/md"
import { LuMessageSquare } from "react-icons/lu"
import useNavigate from "csa/hooks/useNavigate"
import styles from "./foruns.module.css"
import { ForumData, mockForuns } from "csa/mocks/foruns"

export default function Foruns() {
    const { navigate } = useNavigate()
    const { register } = useForm()
    const [searchQuery, setSearchQuery] = useState("")
    const [foruns] = useState<ForumData[]>(mockForuns)

    const filteredForuns = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()
        if (!query) return foruns
        return foruns.filter(f =>
            f.Titulo.toLowerCase().includes(query) ||
            f.Descrição.toLowerCase().includes(query) ||
            f.Tags?.some(t => t.label.toLowerCase().includes(query)) ||
            f.Criador.nome.toLowerCase().includes(query)
        )
    }, [searchQuery, foruns])

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

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
                                placeholder="Buscar tópicos ou palavra-chave"
                                onChange={handleSearch}
                            />
                            <button
                                className={styles.createButton}
                                onClick={() => navigate(Fóruns.criar)}
                            >
                                Criar Novo Tópico
                            </button>
                        </div>
                    </div>

                    {filteredForuns.length === 0 ? (
                        <div className={styles.centerBox}>
                            <EmptyState
                                icon={<LuMessageSquare size={64} />}
                                title={searchQuery ? "Nenhum tópico encontrado" : "Nenhum fórum encontrado"}
                                description={searchQuery ? "Tente buscar com outros termos" : "Seja o primeiro a criar um tópico!"}
                                action={!searchQuery ? {
                                    label: "Criar Tópico",
                                    onClick: () => navigate(Fóruns.criar),
                                } : undefined}
                            />
                        </div>
                    ) : (
                        <div className={styles.list}>
                            {filteredForuns.map((f) => (
                                <div
                                    key={f._id}
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
                                                        <Badge variant="error" size="sm" rounded>
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
                            <BiUpvote className={styles.footerIcon} />
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