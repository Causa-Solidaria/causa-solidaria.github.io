"use client"

import React, { useState } from "react"
import { Center, createListCollection, Button, Text, Image, FileUpload } from "@chakra-ui/react"
import { Box, Flex, Heading, Breadcrumb, FormField, Alert } from "csa/components/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { criarOngSchema } from "csa/lib/validations"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/router"
import JustifyFull, { getToken, staticPosition, SetStaticPositionW, SetStaticPositionH } from "csa/lib/utils"
import { Apis, ONGs } from "csa/Rotas.json"
import { LuUpload } from "react-icons/lu"
import DefaultPage from "csa/components/DefaultPage/_index"
import styles from "./ongCriar.module.css"

/* ==================== Utils ==================== */
const DISPLAY_CRIAR = 2438
const stCriar = (s: number | number[]) => staticPosition(s, DISPLAY_CRIAR)
const stWCriar = (w: number | number[]) => SetStaticPositionW(w, DISPLAY_CRIAR)
const stHCriar = (h: number | number[]) => SetStaticPositionH(h, DISPLAY_CRIAR)

/* ==================== Form Config ==================== */
const itensAtuacao = createListCollection({
  items: [
    { label: "educação", value: "educacao" },
    { label: "saúde", value: "saude" },
    { label: "meio ambiente", value: "meio_ambiente" },
    { label: "direitos humanos", value: "direitos_humanos" },
    { label: "animais", value: "animais" },
    { label: "cultura e arte", value: "cultura_e_arte" },
    { label: "assistência social", value: "assistencia_social" },
    { label: "desenvolvimento comunitário", value: "desenvolvimento_comunitario" },
    { label: "outros", value: "outros" },
  ]
})

const fieldConfigs = [
  { name: "nome", label: "Nome da ONG", type: "text" },
  { name: "cnpj", label: "CNPJ", type: "text" },
  { name: "areaAtuacao", label: "Área de Atuação", type: "select", options: itensAtuacao.items.map(i => ({ label: i.label, value: i.value })) },
  { name: "descricao", label: "Descrição da ONG", type: "textarea", height: 144 },
  { name: "cep", label: "CEP", type: "text" },
  { name: "contato", label: "Email ou Telefone para Contato", type: "text" },
  { name: "site", label: "Site ou redeSocial", type: "text" },
] as const

/* ==================== Main Component ==================== */
export default function CriarNovaOng() {
  const router = useRouter()

  const { register, handleSubmit, formState: { errors }, reset, setError, setValue } = useForm<z.infer<typeof criarOngSchema>>({
    resolver: zodResolver(criarOngSchema)
  })

  const [backendErrors, setBackendErrors] = useState<{ message: string }[]>([])
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)

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

  const onSubmit = async (data: z.infer<typeof criarOngSchema>) => {
    setBackendErrors([])
    try {
      const token = getToken()
      const response = await fetch(Apis.ongs, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (Array.isArray(errorData.message)) {
          setBackendErrors(errorData.message)
          errorData.message.forEach((err: any) => {
            if (err.path && err.message) {
              setError(err.path[0], { type: "server", message: err.message })
            }
          })
        } else {
          setBackendErrors([{ message: errorData.message }])
        }
        return
      }

      alert("ONG cadastrada com sucesso!")
      reset()
      router.push(ONGs.Home)
    } catch (error) {
      console.error(error)
      setBackendErrors([{ message: "Erro ao cadastrar ONG" }])
    }
  }

  const handleCancel = () => {
    reset()
    setLogoPreview(null)
    setUploadError(null)
    setValue("logo", undefined as any)
  }

  const getFieldError = (field: string): string | undefined => {
    const errorRecord = errors as Record<string, { message?: unknown }>
    const message = errorRecord[field]?.message
    if (message == null) return undefined
    return typeof message === "string" ? message : String(message)
  }

  return (
    <DefaultPage className={styles.page}>
      <Center className={styles.pageContainer}>
        <Box className={styles.headerContainer}>
          <Box className={styles.breadcrumbContainer}>
            <Breadcrumb
              items={[
                { label: "ONGs", href: ONGs.Home },
                { label: "Cadastrar Nova ONG" }
              ]}
            />
          </Box>
          <Flex {...JustifyFull()} className={styles.titleContainer}>
            <Heading className={styles.pageTitle}>
              Cadastrar Nova ONG
            </Heading>
          </Flex>
        </Box>

        <Box
          as="form"
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* ==================== Form Fields ==================== */}
          <Flex className={styles.fieldsContainer}>
            {fieldConfigs.map((cfg) => (
              <FormField
                key={cfg.name}
                name={cfg.name}
                label={cfg.label}
                register={register(cfg.name)}
                error={getFieldError(cfg.name)}
                height={cfg.height ?? 72}
                fontSize={26}
                type={cfg.type as any}
                options={cfg.options}
              />
            ))}
          </Flex>

          {/* ==================== Logo Upload ==================== */}
          <Flex className={styles.logoUploadContainer}>
            <Text className={styles.logoLabel}>
              Logo da ONG
            </Text>
            <FileUpload.Root maxFiles={1} onChange={handleLogoChange}>
              <FileUpload.HiddenInput accept="image/jpeg,image/png" />
              <FileUpload.Trigger asChild>
                <Button className={styles.uploadButton}>
                  <LuUpload />&nbsp; Upload imagem (jpg/png)
                </Button>
              </FileUpload.Trigger>
            </FileUpload.Root>
            {uploadError && (
              <Text className={styles.uploadError}>{uploadError}</Text>
            )}
            {logoPreview ? (
              <Image
                src={logoPreview}
                alt="Pré-visualização da logo"
                className={styles.logoPreview}
              />
            ) : (
              <Box className={styles.logoPlaceholder} />
            )}
            <Text className={styles.uploadHint}>
              Tipos aceitos: jpg, png • Dimensão mínima: 300 × 300
            </Text>
          </Flex>

          {/* ==================== Form Actions ==================== */}
          <Flex className={styles.actionsContainer}>
            <Button type="submit" className={styles.submitButton}>
              Cadastrar ONG
            </Button>

            <Button type="button" onClick={handleCancel} className={styles.cancelButton}>
              cancelar
            </Button>
          </Flex>

          {/* ==================== Backend Errors ==================== */}
          {backendErrors.length > 0 && (
            <Alert variant="error" title="Erro ao cadastrar">
              {backendErrors.map((err, idx) => (
                <div key={idx}>{err.message}</div>
              ))}
            </Alert>
          )}
        </Box>
      </Center>
    </DefaultPage>
  )
}