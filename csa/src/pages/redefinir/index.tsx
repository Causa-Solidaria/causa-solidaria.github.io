'use client'

import { Box, Button, Heading, Input, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"

export default function RedefinirSenha() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simula um delay de envio (pode ser substituído por uma chamada API real)
    await new Promise(resolve => setTimeout(resolve, 2000))
    alert(`Um link de redefinição foi enviado para: ${email}`)
    setIsLoading(false)
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
            borderRadius="md"
          />
          <Button 
            colorScheme="green" 
            width="100" 
            onClick={handleSubmit}
            textTransform="uppercase"
            borderRadius="md"
            isLoading={isLoading}
            loadingText="Enviando..."
            bg= "#26a96c"
            color= "white"
            _hover={{ bg: "#38d39f"}}
          >
            Enviar Link de Recuperação
          </Button>
          <Button 
            variant="outline" 
            colorScheme="green" 
            width="100" 
            onClick={() => window.location.href = "/login"}
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
        bg="#26a96c" 
        position="absolute" 
        bottom={0} 
        zIndex={1}
      />
    </Box>
  )
}