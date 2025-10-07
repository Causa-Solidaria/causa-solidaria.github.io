'use client'

import { Box, Button, Heading, Input, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import RootPopup from "csa/components/ProviderPopup"
import usePopup from "csa/hooks/usePopup"

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
      const response = await fetch("/api/redefinir",{
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
    <Box 
      minH="100vh" 
      bg="#e0f7e0"
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      position="relative"
    >
      <Box 
        bg="white" 
        p={10} 
        borderRadius="lg" 
        boxShadow="xl" 
        w="100%" 
        maxW="400px"
        zIndex={2} // Garante que o formulário fique acima da faixa inferior
        position="relative"
      >
        <Heading mb={4} fontFamily="monospace" textAlign="center" color="#004d00">
          Redefinição de Senha!
        </Heading>
        <Text mb={6} color="gray.700" fontWeight="medium" textAlign="center" fontSize="sm">
          Informe seu email de uso para enviarmos seu codigo por email.
        </Text>

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
            bg= "sec"
            color= "white"
            _hover={{ bg: "#38d39f"}}
          >
            Enviar Link de Recuperação
          </Button>
          <Button 
            variant="outline" 
            colorScheme="green" 
            width="100" 
            onClick={() => window.location.href = "/"}
            textTransform="uppercase"
            borderRadius="md"
            
          >
            Voltar
          </Button>
        </VStack>
      </Box>
      <Box 
        width="full" 
        height="50vh" 
        bg="sec" 
        position="absolute" 
        bottom={0} 
        zIndex={1}
      />
    </Box>
  )
}