'use client'

import { Box } from "@chakra-ui/react"

export default function BackgroundDecoration() {
  return (
    <Box
      width="full"
      height="50vh"
      bg="sec"
      position="absolute"
      bottom={0}
      zIndex={1}
    />
  )
}
