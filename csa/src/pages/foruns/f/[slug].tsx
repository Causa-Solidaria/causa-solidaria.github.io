import DefaultPage from "csa/components/DefaultPage"
import Head from "next/head"
import Rotas from "csa/Rotas.json"
import useNavigate from "csa/hooks/useNavigate"
import { Avatar, Badge, Breadcrumb } from "csa/components/ui"
import { FiArrowLeft } from "react-icons/fi"
import { BiUpvote, BiDownvote, BiSolidUpvote, BiSolidDownvote } from "react-icons/bi"
import { MdOutlineMessage } from "react-icons/md"
import { useState, useMemo } from "react"
import styles from "./forum.module.css"
import { VoteDirection, SortOption, Comentario, ForumDetail, mockForunsDetail, mockForumDefault } from "csa/mocks/foruns"

type ForumProps = ForumDetail

function timeAgo(dateStr: string): string {
    return dateStr
}

export default function Forum(f: ForumProps) {
    const { navigate } = useNavigate()
    const [postVote, setPostVote] = useState<VoteDirection>(null)
    const [postKarma, setPostKarma] = useState(f.karma || 0)
    const [comentarios, setComentarios] = useState<Comentario[]>(f.comentarios || [])
    const [novoComentario, setNovoComentario] = useState("")
    const [sortBy, setSortBy] = useState<SortOption>("recentes")

    const sortedComentarios = useMemo(() => {
        const sorted = [...comentarios]
        switch (sortBy) {
            case "recentes":
                return sorted.sort((a, b) => b.id - a.id)
            case "antigos":
                return sorted.sort((a, b) => a.id - b.id)
            case "top":
                return sorted.sort((a, b) => b.karma - a.karma)
            default:
                return sorted
        }
    }, [comentarios, sortBy])

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

    const handleVotePost = (direction: "up" | "down") => {
        if (postVote === direction) {
            // undo vote
            setPostKarma(prev => direction === "up" ? prev - 1 : prev + 1)
            setPostVote(null)
        } else {
            // new vote or switch
            const delta = direction === "up"
                ? (postVote === "down" ? 2 : 1)
                : (postVote === "up" ? -2 : -1)
            setPostKarma(prev => prev + delta)
            setPostVote(direction)
        }
    }

    const handleVoteComment = (id: number, direction: "up" | "down") => {
        setComentarios(prev =>
            prev.map(c => {
                if (c.id !== id) return c
                if (c.vote === direction) {
                    return { ...c, vote: null, karma: direction === "up" ? c.karma - 1 : c.karma + 1 }
                }
                const delta = direction === "up"
                    ? (c.vote === "down" ? 2 : 1)
                    : (c.vote === "up" ? -2 : -1)
                return { ...c, vote: direction, karma: c.karma + delta }
            })
        )
    }

    const handleSubmitComment = () => {
        if (!novoComentario.trim()) return
        const novo: Comentario = {
            id: Date.now(),
            autor: { nome: "Você" },
            texto: novoComentario.trim(),
            data: "Agora",
            karma: 1,
            vote: "up" as VoteDirection,
        }
        setComentarios(prev => [novo, ...prev])
        setNovoComentario("")
    }

    return (
        <DefaultPage>
            <Head>
                <title>{f.titulo} — Fóruns</title>
            </Head>

            <div className={styles.container}>
                <Breadcrumb items={[
                    { label: "fóruns", href: Rotas.Fóruns.Home },
                    { label: f.titulo },
                ]} />

                <div className={styles.card}>
                    {/* Back button */}
                    <button
                        className={styles.backButton}
                        onClick={() => navigate(Rotas.Fóruns.Home)}
                    >
                        <FiArrowLeft />
                        Voltar
                    </button>

                    {/* Post header */}
                    <div className={styles.postHeader}>
                        <Avatar name={f.criador?.nome} src={f.criador?.foto} size="md" />
                        <div className={styles.postAuthorInfo}>
                            <span className={styles.postAuthorName}>{f.criador?.nome}</span>
                            <span className={styles.postDate}>{f.data}</span>
                        </div>
                    </div>

                    {/* Title & Tags */}
                    <h1 className={styles.title}>{f.titulo}</h1>

                    {f.tags && f.tags.length > 0 && (
                        <div className={styles.tags}>
                            {f.tags.map((tag, idx) => (
                                <Badge key={idx} variant="default" size="sm">
                                    {tag.label}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {/* Description */}
                    <p className={styles.description}>{f.descricao}</p>

                    {/* Post actions */}
                    <div className={styles.postActions}>
                        <div className={styles.voteGroup}>
                            <button
                                className={`${styles.voteButton} ${postVote === "up" ? styles.voteUp : ""}`}
                                onClick={() => handleVotePost("up")}
                                aria-label="Upvote"
                            >
                                {postVote === "up" ? <BiSolidUpvote /> : <BiUpvote />}
                            </button>
                            <span className={`${styles.karmaScore} ${postVote === "up" ? styles.karmaUp : ""} ${postVote === "down" ? styles.karmaDown : ""}`}>
                                {postKarma}
                            </span>
                            <button
                                className={`${styles.voteButton} ${postVote === "down" ? styles.voteDown : ""}`}
                                onClick={() => handleVotePost("down")}
                                aria-label="Downvote"
                            >
                                {postVote === "down" ? <BiSolidDownvote /> : <BiDownvote />}
                            </button>
                        </div>
                        <span className={styles.actionButton}>
                            <MdOutlineMessage />
                            <span>{comentarios.length} comentários</span>
                        </span>
                    </div>
                </div>

                {/* Comments section */}
                <div className={styles.commentsSection}>
                    <h2 className={styles.commentsTitle}>Comentários ({comentarios.length})</h2>

                    {/* New comment input */}
                    <div className={styles.newComment}>
                        <Avatar name="Você" size="sm" />
                        <div className={styles.newCommentInputWrapper}>
                            <textarea
                                className={styles.newCommentInput}
                                placeholder="Escreva um comentário..."
                                value={novoComentario}
                                onChange={(e) => setNovoComentario(e.target.value)}
                                rows={3}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault()
                                        handleSubmitComment()
                                    }
                                }}
                            />
                            <button
                                className={styles.sendButton}
                                onClick={handleSubmitComment}
                                disabled={!novoComentario.trim()}
                            >
                                Comentar
                            </button>
                        </div>
                    </div>

                    {/* Sort filter */}
                    <div className={styles.sortRow}>
                        <select
                            className={styles.sortSelect}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                        >
                            <option value="recentes">Mais recentes</option>
                            <option value="antigos">Mais antigos</option>
                            <option value="top">Mais votados</option>
                        </select>
                    </div>

                    {/* Comments list */}
                    <div className={styles.commentsList}>
                        {sortedComentarios.map((c) => (
                            <div key={c.id} className={styles.comment}>
                                <div className={styles.commentVoteGroup}>
                                    <button
                                        className={`${styles.commentVoteBtn} ${c.vote === "up" ? styles.voteUp : ""}`}
                                        onClick={() => handleVoteComment(c.id, "up")}
                                        aria-label="Upvote"
                                    >
                                        {c.vote === "up" ? <BiSolidUpvote /> : <BiUpvote />}
                                    </button>
                                    <span className={`${styles.commentKarma} ${c.vote === "up" ? styles.karmaUp : ""} ${c.vote === "down" ? styles.karmaDown : ""}`}>
                                        {c.karma}
                                    </span>
                                    <button
                                        className={`${styles.commentVoteBtn} ${c.vote === "down" ? styles.voteDown : ""}`}
                                        onClick={() => handleVoteComment(c.id, "down")}
                                        aria-label="Downvote"
                                    >
                                        {c.vote === "down" ? <BiSolidDownvote /> : <BiDownvote />}
                                    </button>
                                </div>
                                <div className={styles.commentContent}>
                                    <Avatar name={c.autor.nome} src={c.autor.foto} size="sm" />
                                    <div className={styles.commentBody}>
                                        <div className={styles.commentHeader}>
                                            <span className={styles.commentAuthor}>{c.autor.nome}</span>
                                            <span className={styles.commentDate}>{c.data}</span>
                                        </div>
                                        <p className={styles.commentText}>{c.texto}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DefaultPage>
    )
}

export const getServerSideProps = async (context: any) => {
    const slug = context.params?.slug as string

    if (!slug) {
        return { props: { notFound: true } as unknown as ForumProps }
    }

    const forum = mockForunsDetail[slug] || { ...mockForumDefault, titulo: decodeURIComponent(slug).replace(/-/g, " ") }

    return { props: forum }
}
