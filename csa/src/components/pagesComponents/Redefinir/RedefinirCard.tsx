'use client'

import { Box, Heading, Text } from "@chakra-ui/react"
import RedefinirForm from "./RedefinirForm"

export default function RedefinirCard() {
  return (
    <Box
      bg="white"
      p={10}
      borderRadius="lg"
      boxShadow="xl"
      w="100%"
      maxW="400px"
      zIndex={2}
      position="relative"
    >
      <Heading mb={4} fontFamily="monospace" textAlign="center" color="#004d00">
        Redefinição de Senha!
      </Heading>
      <Text mb={6} color="gray.700" fontWeight="medium" textAlign="center" fontSize="sm">
        Informe seu email de uso para enviarmos seu codigo por email.
      </Text>
      <RedefinirForm />
    </Box>
  )
}
