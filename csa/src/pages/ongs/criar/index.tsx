"use client"

import React, { useState, useEffect } from "react"
import { Center, createListCollection, Button, Text, Image, FileUpload } from "@chakra-ui/react"
import { Box, Flex, Heading, Breadcrumb, FormField, Alert } from "csa/components/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { criarOngSchema } from "csa/lib/validations"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/router"
import { getToken } from "csa/lib/utils"
import { Apis, ONGs } from "csa/Rotas.json"
import { LuUpload } from "react-icons/lu"
import DefaultPage from "csa/components/DefaultPage"
import { buscarDadosPorCep } from "csa/lib/cepService"
import styles from "./ongCriar.module.css"

/* ==================== Utils ==================== */

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
  { name: "cidade", label: "Cidade", type: "text" },
  { name: "uf", label: "UF", type: "text" },
  { name: "rua", label: "Rua", type: "text" },
  { name: "numero", label: "Número", type: "text" },
  { name: "bairro", label: "Bairro", type: "text" },
  { name: "contato", label: "Email ou Telefone para Contato", type: "text" },
  { name: "site", label: "Site ou redeSocial", type: "text" },
] as const

/* ==================== Main Component ==================== */
export default function CriarNovaOng() {
  const router = useRouter()

  const { register, handleSubmit, formState: { errors }, reset, setError, setValue, watch } = useForm<z.infer<typeof criarOngSchema>>({
    resolver: zodResolver(criarOngSchema)
  })

  const [backendErrors, setBackendErrors] = useState<{ message: string }[]>([])
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

  const onSubmit = async (data: z.infer<typeof criarOngSchema>) => {
    setBackendErrors([])
    try {
      // In development/mock mode, just show success
      if (process.env.NEXT_PUBLIC_USE_MOCK === 'true' || !getToken()) {
        console.log('ONG (mock):', data)
        alert("ONG cadastrada com sucesso!")
        reset()
        router.push(ONGs.Home)
        return
      }

      // Real API call (when backend is ready)
      const token = getToken()
      const response = await fetch(Apis.ongs, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (Array.isArray(errorData.message)) {
          setBackendErrors(errorData.message)
          errorData.message.forEach((err: any) => {
            if (err.path && err.message) {
              setError(err.path[0], { type: 'server', message: err.message })
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
          <Flex justifyContent="center" className={styles.titleContainer}>
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
              <div key={cfg.name} className={styles.formField}>
                <FormField
                  name={cfg.name}
                  label={cfg.label}
                  register={register(cfg.name)}
                  error={cfg.name === "cep" ? (getFieldError(cfg.name) || cepError || undefined) : getFieldError(cfg.name)}
                  type={cfg.type as any}
                  options={cfg.type === "select" ? cfg.options : undefined}
                />
                {cfg.name === "cep" && cepLoading && (
                  <Text className={styles.cepLoading}>
                    Buscando endereço...
                  </Text>
                )}
              </div>
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