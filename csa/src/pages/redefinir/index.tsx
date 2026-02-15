'use client'

import { useState } from "react"
import { Box } from "@chakra-ui/react"
import usePopup from "csa/hooks/usePopup"
import { Login, Apis } from "csa/Rotas.json"
import styles from "./redefinir.module.css"
import useNavigate from "csa/hooks/useNavigate"
import DefaultPage from "csa/components/DefaultPage"
import { Card, Flex, Heading, Input, Button } from "csa/components/ui"

export default function RedefinirSenha() {
  const { navigate } = useNavigate()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const popup = usePopup()

  const handleSubmit = async () => {
    if (!email.trim()) {
      popup("O email é obrigatório.")
      return
    }
    setIsLoading(true)
    try {
      const response = await fetch(Apis.redefinir, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })
      const data = await response.json()
      popup(data.message)
    } catch (error) {
      console.error("Erro ao enviar o email de redefinição:", error)
      popup("Erro ao enviar. Tente novamente.")
    }
    setIsLoading(false)
  }

  return (
    <DefaultPage className={styles.page} hiddenFooter hiddenHeader>
      {/* ==================== Background Decoration ==================== */}
      <Box className={styles.backgroundDecoration} />

      {/* ==================== Main Card ==================== */}
      <Card className={styles.card}>
        <Heading className={styles.title}>
          Redefinição de Senha!
        </Heading>

        <Heading className={styles.description}>
          Informe um email e enviaremos um link de recuperação da sua senha.
        </Heading>

        {/* ==================== Form ==================== */}
        <Flex className={styles.form}>
          <Flex className={styles.fieldGroup}>
            <Heading as="label" className={styles.label}>
              E-mail
            </Heading>
            <Input
              className={styles.input}
              placeholder="Digite seu e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Flex>

          <Button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar Link de Recuperação"}
          </Button>

          <Button
            className={styles.backButton}
            onClick={() => navigate(Login)}
          >
            Voltar
          </Button>
        </Flex>
      </Card>
    </DefaultPage>
  )
}