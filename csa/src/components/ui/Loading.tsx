"use client"

import { Box } from "@chakra-ui/react"

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  color?: string
  thickness?: string
}

const sizeMap = {
  sm: "20px",
  md: "32px",
  lg: "48px",
  xl: "64px"
}

export function Spinner({ size = "md", color = "#4C1D95", thickness = "3px" }: SpinnerProps) {
  return (
    <Box
      w={sizeMap[size]}
      h={sizeMap[size]}
      border={`${thickness} solid`}
      borderColor="#E2E8F0"
      borderTopColor={color}
      borderRadius="full"
      style={{
        animation: "spin 0.8s linear infinite"
      }}
      css={`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    />
  )
}

interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl"
  text?: string
  fullScreen?: boolean
}

export default function Loading({ size = "md", text, fullScreen = false }: LoadingProps) {
  const content = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={4}
    >
      <Spinner size={size} />
      {text && (
        <Box color="#718096" fontSize="md" fontWeight={500}>
          {text}
        </Box>
      )}
    </Box>
  )

  if (fullScreen) {
    return (
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(255, 255, 255, 0.9)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex={9999}
      >
        {content}
      </Box>
    )
  }

  return content
}
