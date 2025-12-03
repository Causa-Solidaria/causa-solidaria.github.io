"use client"

import { Box } from "@chakra-ui/react"
import { ReactNode } from "react"

type BadgeVariant = "default" | "primary" | "success" | "warning" | "error" | "info"
type BadgeSize = "sm" | "md" | "lg"

interface BadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
  children: ReactNode
  rounded?: boolean
}

const variantStyles = {
  default: {
    bg: "#E2E8F0",
    color: "#4A5568"
  },
  primary: {
    bg: "#4C1D95",
    color: "#FFFFFF"
  },
  success: {
    bg: "#C6F6D5",
    color: "#276749"
  },
  warning: {
    bg: "#FEEBC8",
    color: "#C05621"
  },
  error: {
    bg: "#FED7D7",
    color: "#C53030"
  },
  info: {
    bg: "#BEE3F8",
    color: "#2B6CB0"
  }
}

const sizeStyles = {
  sm: {
    fontSize: "10px",
    px: "6px",
    py: "2px"
  },
  md: {
    fontSize: "12px",
    px: "8px",
    py: "3px"
  },
  lg: {
    fontSize: "14px",
    px: "12px",
    py: "4px"
  }
}

export default function Badge({ 
  variant = "default", 
  size = "md", 
  children,
  rounded = false
}: BadgeProps) {
  const styles = variantStyles[variant]
  const sizes = sizeStyles[size]

  return (
    <Box
      as="span"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      bg={styles.bg}
      color={styles.color}
      fontSize={sizes.fontSize}
      px={sizes.px}
      py={sizes.py}
      borderRadius={rounded ? "full" : "4px"}
      fontWeight={600}
      textTransform="uppercase"
      letterSpacing="0.5px"
    >
      {children}
    </Box>
  )
}
