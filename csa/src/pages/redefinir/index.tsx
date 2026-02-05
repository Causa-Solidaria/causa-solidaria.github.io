'use client'

import { useState } from "react"
import { Box, Heading, Text, Button, Input, VStack } from "@chakra-ui/react"
import usePopup from "csa/hooks/usePopup"
import { Login, Apis } from "csa/Rotas.json"
import styles from "./redefinir.module.css"

export default function RedefinirSenha() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const popup = usePopup()

  const handleSubmit = async () => {
    if (!email.trim()) {
      popup("O email é obrigatório.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(Apis.redefinir, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      })
      const data = await response.json();
      popup(data.message);
    } catch (error) {
      console.error("Erro ao enviar o email de redefinição:", error);
    }
    setIsLoading(false);
  }

  return (
    <Box className={styles.page}>
      {/* ==================== Card ==================== */}
      <Box className={styles.card}>
        <Heading className={styles.title}>
          Redefinição de Senha!
        </Heading>
        <Text className={styles.description}>
          Informe seu email de uso para enviarmos seu codigo por email.
        </Text>
        
        {/* ==================== Form ==================== */}
        <VStack className={styles.form}>
          <Input
            className={styles.input}
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            className={styles.submitButton}
            onClick={handleSubmit}
            loading={isLoading}
            loadingText="Enviando..."
          >
            Enviar Link de Recuperação
          </Button>
          <Button
            className={styles.backButton}
            onClick={() => window.location.href = Login}
          >
            Voltar
          </Button>
        </VStack>
      </Box>

      {/* ==================== Background Decoration ==================== */}
      <Box className={styles.backgroundDecoration} />
    </Box>
  )
}