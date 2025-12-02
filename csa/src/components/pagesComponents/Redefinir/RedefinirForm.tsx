'use client'

import { Button, Input, VStack } from "@chakra-ui/react"
import { useState } from "react"
import usePopup from "csa/hooks/usePopup"
import { Home, Apis } from "csa/Rotas.json"

export default function RedefinirForm() {
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
    <VStack>
      <Input
        placeholder="E-mail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        borderColor="green.500"
        _focus={{ borderColor: "green.700" }}
        textAlign="center"
        borderRadius="md"
      />
      <Button
        colorScheme="green"
        width="100"
        onClick={handleSubmit}
        textTransform="uppercase"
        borderRadius="md"
        loading={isLoading}
        loadingText="Enviando..."
        bg="sec"
        color="white"
        _hover={{ bg: "#38d39f" }}
      >
        Enviar Link de Recuperação
      </Button>
      <Button
        variant="outline"
        colorScheme="green"
        width="100"
        onClick={() => window.location.href = Home}
        textTransform="uppercase"
        borderRadius="md"
      >
        Voltar
      </Button>
    </VStack>
  )
}
