"use client"

import { Box } from "@chakra-ui/react"
import { ReactNode } from "react"
import Flex from "./Flex"
import styles from "./ui.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames"

type AlertVariant = "info" | "success" | "warning" | "error"

interface AlertProps {
  variant?: AlertVariant
  title?: string
  children: ReactNode
  showIcon?: boolean
}

// Simple SVG icons as components
const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
)

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
)

const variantStyles = {
  info: {
    bg: "#EBF8FF",
    border: "#3182CE",
    color: "#2B6CB0",
    Icon: InfoIcon
  },
  success: {
    bg: "#F0FFF4",
    border: "#38A169",
    color: "#276749",
    Icon: CheckIcon
  },
  warning: {
    bg: "#FFFAF0",
    border: "#DD6B20",
    color: "#C05621",
    Icon: WarningIcon
  },
  error: {
    bg: "#FFF5F5",
    border: "#E53E3E",
    color: "#C53030",
    Icon: ErrorIcon
  }
}

export default function Alert({ 
  variant = "info", 
  title, 
  children, 
  showIcon = true 
}: AlertProps) {
  const variantConfig = variantStyles[variant]
  const { Icon } = variantConfig
  const variantClass =
    variant === "info"
      ? styles.alertInfo
      : variant === "success"
      ? styles.alertSuccess
      : variant === "warning"
      ? styles.alertWarning
      : styles.alertError

  return (
    <Box className={MergeClassnames(styles.alert, variantClass)}>
      <Flex dir="row" gap={3} alignItems="flex-start">
        {showIcon && (
          <Box className={styles.alertIcon}>
            <Icon />
          </Box>
        )}
        <Box flex={1}>
          {title && (
            <Box className={styles.alertTitle}>
              {title}
            </Box>
          )}
          <Box className={styles.alertDescription}>
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
