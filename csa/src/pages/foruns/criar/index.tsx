'use client'

import DefaultPage from "csa/components/DefaultPage"
import { Box, Badge, Breadcrumb, Card } from "csa/components/ui"
import Heading from "csa/components/ui/heading"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { criarForumSchema, tagsForumDisponiveis, type CriarForumData } from "csa/lib/validations"
import { Fóruns } from "csa/Rotas.json"
import useNavigate from "csa/hooks/useNavigate"
import usePopup from "csa/hooks/usePopup"
import { handleCriarForum } from "csa/lib/handlers"
import { useState } from "react"
import styles from "./criar.module.css"

export default function CriarForum() {
    const { navigate } = useNavigate()
    const popup = usePopup()

    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<CriarForumData>({
        resolver: zodResolver(criarForumSchema),
        defaultValues: {
            titulo: "",
            descricao: "",
            tags: [],
        },
    })

    const titulo = watch("titulo")
    const descricao = watch("descricao")

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) => {
            const isSelected = prev.includes(tag)
            let next: string[]

            if (isSelected) {
                next = prev.filter((t) => t !== tag)
            } else {
                if (prev.length >= 4) return prev
                next = [...prev, tag]
            }

            setValue("tags", next, { shouldValidate: true })
            return next
        })
    }

    async function onSubmit(data: CriarForumData) {
        const success = await handleCriarForum(data, popup)
        if (success) {
            navigate(Fóruns.Home)
        }
    }

    const handleCancel = () => {
        navigate(Fóruns.Home)
    }

    return (
        <DefaultPage>
            <Box className={styles.container}>
                <Breadcrumb
                    items={[
                        { label: "Fóruns", href: Fóruns.Home },
                        { label: "Criar" },
                    ]}
                />

                <Heading className={styles.pageTitle}>
                    criar novo tópico
                </Heading>

                <Card className={styles.card}>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        {/* ==================== Título ==================== */}
                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>Título</label>
                            <input
                                {...register("titulo")}
                                className={styles.input}
                                placeholder="Ex: Como ajudar minha comunidade?"
                                maxLength={120}
                            />
                            <div className={`${styles.charCount} ${(titulo?.length || 0) > 100 ? styles.charCountWarning : ""}`}>
                                {titulo?.length || 0}/120
                            </div>
                            {errors.titulo && (
                                <span className={styles.errorMessage}>{errors.titulo.message}</span>
                            )}
                        </div>

                        {/* ==================== Descrição ==================== */}
                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>Descrição</label>
                            <span className={styles.fieldHint}>
                                Explique o tema, dê contexto e incentive a discussão
                            </span>
                            <textarea
                                {...register("descricao")}
                                className={styles.textarea}
                                placeholder="Descreva o assunto que você quer discutir com a comunidade..."
                                maxLength={5000}
                            />
                            <div className={`${styles.charCount} ${(descricao?.length || 0) < 20 && (descricao?.length || 0) > 0 ? styles.charCountWarning : ""}`}>
                                {descricao?.length || 0}/5000
                            </div>
                            {errors.descricao && (
                                <span className={styles.errorMessage}>{errors.descricao.message}</span>
                            )}
                        </div>

                        {/* ==================== Tags ==================== */}
                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>Tags</label>
                            <span className={styles.fieldHint}>
                                Selecione de 1 a 4 tags para categorizar seu tópico
                            </span>

                            <div className={styles.tagsContainer}>
                                {tagsForumDisponiveis.map((tag) => {
                                    const isSelected = selectedTags.includes(tag)
                                    const isDisabled = !isSelected && selectedTags.length >= 4

                                    return (
                                        <button
                                            key={tag}
                                            type="button"
                                            className={`${styles.tagOption} ${isSelected ? styles.tagSelected : ""} ${isDisabled ? styles.tagDisabled : ""}`}
                                            onClick={() => !isDisabled && toggleTag(tag)}
                                            aria-pressed={isSelected}
                                            disabled={isDisabled}
                                        >
                                            {tag}
                                        </button>
                                    )
                                })}
                            </div>

                            {selectedTags.length > 0 && (
                                <span className={styles.selectedTagsInfo}>
                                    {selectedTags.length}/4 selecionada{selectedTags.length !== 1 ? "s" : ""}
                                </span>
                            )}

                            {errors.tags && (
                                <span className={styles.errorMessage}>{errors.tags.message}</span>
                            )}
                        </div>

                        {/* ==================== Preview ==================== */}
                        <div className={styles.previewSection}>
                            <span className={styles.previewLabel}>Pré-visualização</span>

                            {titulo ? (
                                <h3 className={styles.previewTitle}>{titulo}</h3>
                            ) : (
                                <span className={styles.previewEmpty}>Título do tópico aparecerá aqui</span>
                            )}

                            {selectedTags.length > 0 && (
                                <div className={styles.previewTags}>
                                    {selectedTags.map((tag) => (
                                        <Badge key={tag} variant="default" size="sm">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {descricao ? (
                                <p className={styles.previewDescription}>{descricao}</p>
                            ) : (
                                <span className={styles.previewEmpty}>A descrição aparecerá aqui</span>
                            )}
                        </div>

                        {/* ==================== Ações ==================== */}
                        <div className={styles.actionsRow}>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={handleCancel}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Criando..." : "Criar Tópico"}
                            </button>
                        </div>
                    </form>
                </Card>
            </Box>
        </DefaultPage>
    )
}
