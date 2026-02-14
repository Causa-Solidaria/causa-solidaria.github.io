"use client"

import { Box } from "@chakra-ui/react"
import { ReactNode } from "react"
import styles from "./ui.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames"

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
  const variantClass =
    variant === "primary" ? styles.badgePrimary :
    variant === "success" ? styles.badgeSuccess :
    variant === "warning" ? styles.badgeWarning :
    variant === "error" ? styles.badgeError :
    variant === "info" ? styles.badgeInfo : styles.badgeDefault
  const sizeClass =
    size === "sm" ? styles.badgeSm : size === "lg" ? styles.badgeLg : styles.badgeMd
  const shapeClass = rounded ? styles.badgeRounded : styles.badgeSquare

  return (
    <Box
      as="span"
      className={MergeClassnames(styles.badge, variantClass, sizeClass, shapeClass)}
    >
      {children}
    </Box>
  )
}
