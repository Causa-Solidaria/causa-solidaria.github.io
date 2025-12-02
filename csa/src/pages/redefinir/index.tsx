'use client'

import { Box } from "@chakra-ui/react"
import { RedefinirCard, BackgroundDecoration } from "csa/components/pagesComponents/Redefinir"

export default function RedefinirSenha() {
  return (
    <Box
      minH="100vh"
      bg="#e0f7e0"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <RedefinirCard />
      <BackgroundDecoration />
    </Box>
  )
}