"use client"

import { Box } from "@chakra-ui/react"
import { ReactNode } from "react"

interface SkeletonProps {
  w?: string | number
  h?: string | number
  borderRadius?: string | number
  children?: ReactNode
  isLoaded?: boolean
}

export default function Skeleton({ 
  w = "100%", 
  h = "20px", 
  borderRadius = "8px",
  children,
  isLoaded = false
}: SkeletonProps) {
  if (isLoaded) {
    return <>{children}</>
  }

  return (
    <Box
      w={w}
      h={h}
      borderRadius={borderRadius}
      bg="#E2E8F0"
      backgroundImage="linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)"
      backgroundSize="200% 100%"
      style={{
        animation: "shimmer 1.5s infinite"
      }}
      css={`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}
    />
  )
}

// Skeleton para texto
export function SkeletonText({ lines = 3, gap = 2 }: { lines?: number; gap?: number }) {
  return (
    <Box display="flex" flexDirection="column" gap={gap}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          h="16px" 
          w={i === lines - 1 ? "70%" : "100%"} 
        />
      ))}
    </Box>
  )
}

// Skeleton para avatar circular
export function SkeletonCircle({ size = "48px" }: { size?: string | number }) {
  return <Skeleton w={size} h={size} borderRadius="full" />
}

// Skeleton para card
export function SkeletonCard() {
  return (
    <Box
      p={4}
      borderRadius="16px"
      border="1px solid"
      borderColor="#E2E8F0"
    >
      <Box display="flex" gap={4} mb={4}>
        <SkeletonCircle size="48px" />
        <Box flex={1}>
          <Box mb={2}><Skeleton h="20px" w="60%" /></Box>
          <Skeleton h="14px" w="40%" />
        </Box>
      </Box>
      <SkeletonText lines={3} />
    </Box>
  )
}
