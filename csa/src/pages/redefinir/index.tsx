'use client'

import { Box, Button, Heading, Input, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"

export default function RedefinirSenha() {
  const [email, setEmail] = useState("")

  const handleSubmit = async () => {
    alert(`Um link de redefinição foi enviado para: ${email}`)
    // Aqui você poderia chamar: await fetch("/api/redefinir-senha", { ... })
  }

  return (
    <Box 
      minH="100vh" 
      bgGradient="linear(to-b, #E6FFE6, #006400)" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
    >
      <Box 
        bg="white" 
        p={10} 
        borderRadius="lg" 
        boxShadow="xl" 
        w="100%" 
        maxW="400px"
      >
        <Heading mb={4} fontFamily="monospace" textAlign="center">
          Redefinição de Senha!
        </Heading>
        <Text mb={4} color="gray.600" fontWeight="medium" textAlign="center">
          Informe um email e enviaremos um link de recuperação da sua senha.
        </Text>

        <VStack spacing={6}>
          <Input 
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            borderColor="green.500"
            _focus={{ borderColor: "green.700" }}
            textAlign="center"
          />
          <Button 
            colorScheme="green" 
            width="100%" 
            onClick={handleSubmit}
            textTransform="uppercase"
          >
            Enviar Link de Recuperação
          </Button>
          <Button 
            variant="outline" 
            colorScheme="green" 
            width="100%" 
            onClick={() => window.location.href = "/login"}
            textTransform="uppercase"
          >
            Voltar
          </Button>
        </VStack>
      </Box>
    </Box>
  )
}