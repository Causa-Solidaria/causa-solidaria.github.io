"use client"

import { useEffect, useState } from "react"
import { Box, VStack, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import DefaultPage from "csa/components/DefaultPage/index"
import { Card, Loading, Alert, Breadcrumb, Input, Heading } from "csa/components/ui"
import { getToken, isTokenExpired } from "csa/lib/utils"
import { Login, Apis } from "csa/Rotas.json"
import { editarPerfilSchema, EditarPerfilData } from "csa/lib/validations/auth"
import useNavigate from "csa/hooks/useNavigate"
import usePopup from "csa/hooks/usePopup"
import styles from "./editar.module.css"

type PerfilData = {
  name?: string
  bio?: string
  foto?: string
  numero?: string
  email?: string
}

/* ==================== Hook ==================== */
function usePerfilData() {
  const { navigate } = useNavigate()
  const [data, setData] = useState<PerfilData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const currentToken = getToken()
    
    if (!currentToken || isTokenExpired(currentToken)) {
      navigate(Login)
      return
    }

    const fetchPerfilData = async () => {
      try {
        const response = await fetch(Apis.perfil, {
          headers: {
            'Authorization': `Bearer ${currentToken}`
          }
        })
        
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`)
        }
        
        const result = await response.json()
        setData(result)
      } catch (err) {
        console.error('Erro ao buscar dados do perfil:', err)
        setError('Erro ao carregar perfil')
      } finally {
        setLoading(false)
      }
    }

    fetchPerfilData()
  }, [navigate])

  return { data, loading, error }
}

export default function EditarPerfil() {
  const { navigate } = useNavigate()
  const popup = usePopup()
  const { data, loading } = usePerfilData()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [thumbnailString, setThumbnailString] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)

  // Handler para mudança de foto
  const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validar tipo de arquivo
    const isJpgPng = /image\/(jpeg|png)/.test(file.type) || /\.(jpe?g|png)$/i.test(file.name)
    if (!isJpgPng) {
      setUploadError("Apenas arquivos .jpg ou .png")
      setThumbnailString(null)
      setPreview(null)
      return
    }

    // Validar dimensões mínimas
    const dimsOk = await new Promise<boolean>((resolve) => {
      const img = new window.Image()
      img.onload = () => resolve(img.width >= 200 && img.height >= 200)
      img.onerror = () => resolve(false)
      img.src = URL.createObjectURL(file)
    })
    if (!dimsOk) {
      setUploadError("Dimensão mínima: 200x200")
      setThumbnailString(null)
      setPreview(null)
      return
    }

    // Converter para base64
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result?.toString().split(",")[1]
      if (!base64) return

      setThumbnailString(base64)
      setPreview(URL.createObjectURL(file))
      setUploadError(null)
    }
    reader.readAsDataURL(file)
  }

  // Função para formatar telefone
  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, "").slice(0, 11)
    
    if (cleaned.length === 0) return ""
    if (cleaned.length <= 2) return `(${cleaned}`
    if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
  }

  // Manipulador de mudança para o telefone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    e.target.value = formatted
  }

  // Initialize preview com foto atual quando data carregar

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<EditarPerfilData>({
    resolver: zodResolver(editarPerfilSchema),
    defaultValues: {
      bio: data?.bio || "",
      numero: data?.numero || "",
    }
  })

  // Atualizar os valores padrão quando os dados carregarem
  useEffect(() => {
    if (data) {
      reset({
        bio: data.bio || "",
        numero: formatPhoneNumber(data.numero || ""),
      })
      if (data.foto) {
        setPreview(data.foto)
      }
    }
  }, [data, reset])

  if (loading) {
    return (
      <DefaultPage>
        <Loading size="xl" text="Carregando perfil..." />
      </DefaultPage>
    )
  }

  if (!data) {
    return (
      <DefaultPage>
        <Alert variant="error" title="Erro">
          Não foi possível carregar os dados do perfil.
        </Alert>
      </DefaultPage>
    )
  }

  if (isTokenExpired(getToken() as string)) {
    return (
      <DefaultPage>
        <Alert variant="error" title="Sessão expirada">
          Por favor, faça login para editar seu perfil.
        </Alert>
      </DefaultPage>
    )
  }

  const onSubmit = async (formData: EditarPerfilData) => {
    const currentToken = getToken()
    
    if (!currentToken || isTokenExpired(currentToken)) {
      popup('Sessão expirada. Faça login novamente.')
      navigate(Login)
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(Apis.perfil, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentToken}`
        },
        body: JSON.stringify({
          bio: formData.bio,
          numero: (formData.numero || "").replace(/\D/g, ""),
          foto: thumbnailString || undefined,
        })
      })

      if (response.ok) {
        popup("Perfil atualizado com sucesso!")
        navigate('/perfil')
      } else {
        const errorData = await response.json()
        popup("Erro ao atualizar perfil: " + (errorData.message || "Erro desconhecido"))
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      popup("Erro ao atualizar perfil")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DefaultPage>
      <Breadcrumb items={[{ label: "perfil", href: "/perfil" }, { label: "editar" }]} />
      <Box className={styles.container}>
        <Heading className={styles.pageTitle}>
          Editar Perfil
        </Heading>

        <Card className={styles.card}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={6} align="stretch">
              {/* ==================== Foto de Perfil ==================== */}
              <Box className={styles.photoSection}>
                <Text className={styles.photoLabel}>Foto de Perfil</Text>
                
                <input 
                  type="file" 
                  accept="image/jpeg,image/png" 
                  onChange={handlePhotoChange}
                  className={styles.photoInput}
                />

                {uploadError && <Text className={styles.errorMessage}>{uploadError}</Text>}

                {preview && (
                  <img
                    src={preview}
                    alt={data?.name}
                    className={styles.photoPreview}
                  />
                )}

                <Text className={styles.photoCaption}>
                  📸 JPG ou PNG • Mínimo 200×200px
                </Text>
              </Box>

              {/* ==================== Telefone ==================== */}
              <Box>
                <Text mb={2}>Telefone</Text>
                <Input
                  {...register("numero")}
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                  onChange={handlePhoneChange}
                  borderColor="var(--dark-green)"
                />
                {errors.numero && <Text color="red.500" fontSize="sm">{errors.numero.message}</Text>}
              </Box>

              {/* ==================== Biografia ==================== */}
              <Box>
                <Text mb={2}>Biografia</Text>
                <Input
                  type="textarea"
                  {...register("bio")}
                  placeholder="Conte um pouco sobre você..."
                  borderColor="var(--dark-green)"
                />
                {errors.bio && <Text color="red.500" fontSize="sm">{errors.bio.message}</Text>}
              </Box>

              {/* ==================== Botões ==================== */}
              <div className={styles.buttonsContainer}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => navigate('/perfil')}
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </VStack>
          </form>
        </Card>
      </Box>
    </DefaultPage>
  )
}