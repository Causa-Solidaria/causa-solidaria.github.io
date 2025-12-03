"use client"

import React from "react"
import { Center, createListCollection } from "@chakra-ui/react"
import { Box, Flex, Heading, Breadcrumb } from "csa/components/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { criarOngSchema } from "csa/lib/validations"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/router"
import JustifyFull, { getToken } from "csa/lib/utils"
import { Apis, ONGs } from "csa/Rotas.json"
import { stCriar, stWCriar } from "./utils"
import CriarOngFormFields from "./CriarOngFormFields"
import CriarOngFormActions from "./CriarOngFormActions"

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

export default function CriarOngContent() {
  const router = useRouter()

  const { register, handleSubmit, formState: { errors }, reset, setError, setValue } = useForm<z.infer<typeof criarOngSchema>>({
    resolver: zodResolver(criarOngSchema)
  })

  const [backendErrors, setBackendErrors] = React.useState<{ message: string }[]>([])
  const [logoPreview, setLogoPreview] = React.useState<string | null>(null)
  const [uploadError, setUploadError] = React.useState<string | null>(null)

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
    <Center display="flex" flexDir="column" mb={stCriar(100)}>
      <Box {...stWCriar(1497)} m={stCriar(60)}>
        <Box mb={stCriar(30)}>
          <Breadcrumb
            items={[
              { label: "ONGs", href: ONGs.Home },
              { label: "Cadastrar Nova ONG" }
            ]}
          />
        </Box>
        <Flex {...JustifyFull()} m={stCriar(50)}>
          <Heading fontSize={96} MaxSizeDisplay={2438} fontWeight={900} color="#fff" textAlign="center">
            Cadastrar Nova ONG
          </Heading>
        </Flex>
      </Box>

      <Box
        as="form"
        display="flex"
        flexDir="column"
        bg="#fff"
        onSubmit={handleSubmit(onSubmit)}
        {...stWCriar(1497)}
        borderRadius={stCriar(50)}
        border="solid black"
        borderWidth={stCriar(5)}
        p={stCriar(100)}
        gap={stCriar(10)}
      >
        <CriarOngFormFields
          fieldConfigs={fieldConfigs}
          register={register}
          getFieldError={getFieldError}
          logoPreview={logoPreview}
          uploadError={uploadError}
          onLogoChange={handleLogoChange}
        />

        <CriarOngFormActions
          onCancel={handleCancel}
          backendErrors={backendErrors}
        />
      </Box>
    </Center>
  )
}
