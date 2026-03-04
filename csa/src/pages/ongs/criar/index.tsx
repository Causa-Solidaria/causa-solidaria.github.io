"use client"

import React, { useState, useEffect } from "react"
import { FileUpload, Image } from "@chakra-ui/react"
import { Box, Breadcrumb, Card } from "csa/components/ui"
import Heading from "csa/components/ui/heading"
import { zodResolver } from "@hookform/resolvers/zod"
import { criarOngSchema } from "csa/lib/validations"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { getToken } from "csa/lib/utils"
import { Apis, ONGs } from "csa/Rotas.json"
import { apiUrl } from "csa/lib/apiBase"
import { LuUpload } from "react-icons/lu"
import DefaultPage from "csa/components/DefaultPage"
import { buscarDadosPorCep } from "csa/lib/cepService"
import useNavigate from "csa/hooks/useNavigate"
import usePopup from "csa/hooks/usePopup"
import styles from "./ongCriar.module.css"

/* ==================== Utils ==================== */

const areasAtuacao = [
  { label: "Educação", value: "educacao" },
  { label: "Saúde", value: "saude" },
  { label: "Meio Ambiente", value: "meio_ambiente" },
  { label: "Direitos Humanos", value: "direitos_humanos" },
  { label: "Animais", value: "animais" },
  { label: "Cultura e Arte", value: "cultura_e_arte" },
  { label: "Assistência Social", value: "assistencia_social" },
  { label: "Desenvolvimento Comunitário", value: "desenvolvimento_comunitario" },
  { label: "Outros", value: "outros" },
]

/* ==================== Main Component ==================== */
export default function CriarNovaOng() {
  const { navigate } = useNavigate()
  const popup = usePopup()

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setError, setValue, watch } = useForm<z.infer<typeof criarOngSchema>>({
    resolver: zodResolver(criarOngSchema)
  })

  const [backendErrors, setBackendErrors] = useState<string[]>([])
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [cepLoading, setCepLoading] = useState(false)
  const [cepError, setCepError] = useState<string | null>(null)

  // Monitora o campo CEP para buscar dados automaticamente
  const cepValue = watch("cep")

  // useEffect para buscar dados do CEP quando ele mudar
  useEffect(() => {
    const buscarCep = async () => {
      setCepError(null)
      
      if (!cepValue || cepValue.replace(/\D/g, '').length !== 8) {
        return
      }

      setCepLoading(true)
      try {
        const dados = await buscarDadosPorCep(cepValue)
        
        if (dados) {
          // Preenche os campos automaticamente
          setValue("cidade", dados.cidade, { shouldValidate: true })
          setValue("uf", dados.uf, { shouldValidate: true })
          setValue("bairro", dados.bairro, { shouldValidate: true })
          setValue("rua", dados.rua, { shouldValidate: true })
        } else {
          setCepError("CEP não encontrado - você pode preencher manualmente os campos obrigatórios")
        }
      } catch (error) {
        setCepError("Erro ao buscar CEP - tente novamente ou preencha manualmente")
        console.error("Erro ao buscar CEP:", error)
      } finally {
        setCepLoading(false)
      }
    }

    buscarCep()
  }, [cepValue, setValue])

  const handleLogoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const isJpgPng = /image\/(jpeg|png)/.test(file.type) || /\.(jpe?g|png)$/i.test(file.name)
    if (!isJpgPng) {
      setUploadError("Apenas arquivos .jpg ou .png")
      setLogoPreview(null)
      setValue("logo", undefined as any)
      return
    }

    const dimsOk = await new Promise<boolean>((resolve) => {
      const img = new window.Image()
      img.onload = () => resolve(img.width >= 300 && img.height >= 300)
      img.onerror = () => resolve(false)
      img.src = URL.createObjectURL(file)
    })
    if (!dimsOk) {
      setUploadError("Dimensão mínima: 300x300")
      setLogoPreview(null)
      setValue("logo", undefined as any)
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result?.toString().split(",")[1]
      if (!base64) return
      setLogoPreview(URL.createObjectURL(file))
      setUploadError(null)
      setValue("logo", base64 as any, { shouldValidate: true })
    }
    reader.readAsDataURL(file)
  }

  const descricao = watch("descricao")

  const onSubmit = async (data: z.infer<typeof criarOngSchema>) => {
    setBackendErrors([])
    try {
      if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
        console.log('ONG (mock):', data)
        popup("ONG cadastrada com sucesso!")
        reset()
        navigate(ONGs.Home)
        return
      }

      const token = getToken()
      if (!token) {
        popup("Você precisa estar logado para cadastrar uma ONG.")
        return
      }

      const response = await fetch(apiUrl(Apis.ongs), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (Array.isArray(errorData.error)) {
          setBackendErrors(errorData.error.map((e: any) => e.message ?? String(e)))
          errorData.error.forEach((err: any) => {
            if (err.path && err.message) {
              setError(err.path[0], { type: 'server', message: err.message })
            }
          })
        } else {
          setBackendErrors([errorData.error ?? "Erro desconhecido"])
        }
        return
      }

      popup("ONG cadastrada com sucesso!")
      reset()
      navigate(ONGs.Home)
    } catch (error) {
      console.error(error)
      setBackendErrors(["Erro ao cadastrar ONG"])
    }
  }

  const handleCancel = () => {
    navigate(ONGs.Home)
  }

  return (
    <DefaultPage>
      <Box className={styles.container}>
        <Breadcrumb
          items={[
            { label: "ONGs", href: ONGs.Home },
            { label: "Cadastrar" },
          ]}
        />

        <Heading className={styles.pageTitle}>
          cadastrar nova ong
        </Heading>

        <Card className={styles.card}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {/* ==================== Informações Básicas ==================== */}
            <span className={styles.sectionTitle}>Informações Básicas</span>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Nome da ONG</label>
              <input
                {...register("nome")}
                className={styles.input}
                placeholder="Ex: Instituto Verde Vida"
              />
              {errors.nome && <span className={styles.errorMessage}>{errors.nome.message}</span>}
            </div>

            <div className={styles.gridRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>CNPJ</label>
                <input
                  {...register("cnpj")}
                  className={styles.input}
                  placeholder="00.000.000/0000-00"
                />
                {errors.cnpj && <span className={styles.errorMessage}>{errors.cnpj.message}</span>}
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Área de Atuação</label>
                <select {...register("areaAtuacao")} className={styles.select} defaultValue="">
                  <option value="" disabled>Selecione</option>
                  {areasAtuacao.map((a) => (
                    <option key={a.value} value={a.value}>{a.label}</option>
                  ))}
                </select>
                {errors.areaAtuacao && <span className={styles.errorMessage}>{errors.areaAtuacao.message}</span>}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Descrição da ONG</label>
              <span className={styles.fieldHint}>Descreva a missão, atuação e impacto da organização</span>
              <textarea
                {...register("descricao")}
                className={styles.textarea}
                placeholder="Conte sobre a ONG, sua história, o que faz e quem atende..."
                maxLength={2000}
              />
              <div className={`${styles.charCount} ${(descricao?.length || 0) > 1800 ? styles.charCountWarning : ""}`}>
                {descricao?.length || 0}/2000
              </div>
              {errors.descricao && <span className={styles.errorMessage}>{errors.descricao.message}</span>}
            </div>

            {/* ==================== Endereço ==================== */}
            <span className={styles.sectionTitle}>Endereço</span>

            <div className={styles.gridRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>CEP</label>
                <input
                  {...register("cep")}
                  className={styles.input}
                  placeholder="00000-000"
                />
                {cepLoading && <span className={styles.cepLoading}>Buscando endereço...</span>}
                {(errors.cep || cepError) && (
                  <span className={styles.errorMessage}>{errors.cep?.message || cepError}</span>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>UF</label>
                <input
                  {...register("uf")}
                  className={styles.input}
                  placeholder="SP"
                  maxLength={2}
                />
                {errors.uf && <span className={styles.errorMessage}>{errors.uf.message}</span>}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Cidade</label>
              <input
                {...register("cidade")}
                className={styles.input}
                placeholder="São Paulo"
              />
              {errors.cidade && <span className={styles.errorMessage}>{errors.cidade.message}</span>}
            </div>

            <div className={styles.gridRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Rua</label>
                <input
                  {...register("rua")}
                  className={styles.input}
                  placeholder="Rua das Flores"
                />
                {errors.rua && <span className={styles.errorMessage}>{errors.rua.message}</span>}
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Número</label>
                <input
                  {...register("numero")}
                  className={styles.input}
                  placeholder="123"
                />
                {errors.numero && <span className={styles.errorMessage}>{errors.numero.message}</span>}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Bairro</label>
              <input
                {...register("bairro")}
                className={styles.input}
                placeholder="Centro"
              />
              {errors.bairro && <span className={styles.errorMessage}>{errors.bairro.message}</span>}
            </div>

            {/* ==================== Contato ==================== */}
            <span className={styles.sectionTitle}>Contato</span>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Email ou Telefone</label>
              <input
                {...register("contato")}
                className={styles.input}
                placeholder="contato@ong.org ou (11) 9999-9999"
              />
              {errors.contato && <span className={styles.errorMessage}>{errors.contato.message}</span>}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Site ou Rede Social</label>
              <span className={styles.fieldHint}>Opcional</span>
              <input
                {...register("site")}
                className={styles.input}
                placeholder="https://minhaong.org"
              />
              {errors.site && <span className={styles.errorMessage}>{errors.site.message}</span>}
            </div>

            {/* ==================== Logo Upload ==================== */}
            <div className={styles.uploadSection}>
              <span className={styles.uploadLabel}>Logo da ONG</span>

              <FileUpload.Root maxFiles={1} onChange={handleLogoChange}>
                <FileUpload.HiddenInput accept="image/jpeg,image/png" />
                <FileUpload.Trigger asChild>
                  <button type="button" className={styles.uploadTrigger}>
                    <LuUpload /> Upload imagem (jpg/png)
                  </button>
                </FileUpload.Trigger>
              </FileUpload.Root>

              {uploadError && <span className={styles.uploadError}>{uploadError}</span>}

              {logoPreview ? (
                <Image
                  src={logoPreview}
                  alt="Pré-visualização da logo"
                  className={styles.logoPreview}
                />
              ) : (
                <div className={styles.logoPlaceholder} />
              )}

              <span className={styles.uploadHint}>
                Tipos aceitos: jpg, png • Dimensão mínima: 300 × 300
              </span>
            </div>

            {/* ==================== Backend Errors ==================== */}
            {backendErrors.length > 0 && (
              <div className={styles.backendErrors}>
                <span className={styles.backendErrorTitle}>Erro ao cadastrar</span>
                {backendErrors.map((msg, idx) => (
                  <span key={idx} className={styles.backendErrorItem}>{msg}</span>
                ))}
              </div>
            )}

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
                {isSubmitting ? "Cadastrando..." : "Cadastrar ONG"}
              </button>
            </div>
          </form>
        </Card>
      </Box>
    </DefaultPage>
  )
}