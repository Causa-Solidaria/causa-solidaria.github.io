"use client"

import { ReactNode } from "react"
import Modal from "./Modal"
import Flex from "./Flex"
import Button from "./Button"
import { Box } from "@chakra-ui/react"

const WarningIcon = ({ color }: { color: string }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  variant?: "danger" | "warning" | "info"
  isLoading?: boolean
}

const variantStyles = {
  danger: {
    iconColor: "#E53E3E",
    iconBg: "#FFF5F5",
    confirmBg: "#E53E3E",
    confirmHover: "#C53030"
  },
  warning: {
    iconColor: "#DD6B20",
    iconBg: "#FFFAF0",
    confirmBg: "#DD6B20",
    confirmHover: "#C05621"
  },
  info: {
    iconColor: "#4C1D95",
    iconBg: "#F5F3FF",
    confirmBg: "#4C1D95",
    confirmHover: "#3B1572"
  }
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  variant = "danger",
  isLoading = false
}: ConfirmDialogProps) {
  const styles = variantStyles[variant]

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <Flex dir="column" alignItems="center" textAlign="center">
        <Box
          width="64px"
          height="64px"
          borderRadius="full"
          bg={styles.iconBg}
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb={4}
        >
          <WarningIcon color={styles.iconColor} />
        </Box>

        <Box
          fontSize="lg"
          fontWeight={600}
          color="#2D3748"
          mb={2}
        >
          {title}
        </Box>

        <Box
          fontSize="sm"
          color="#718096"
          mb={6}
        >
          {message}
        </Box>

        <Flex dir="row" gap={3} width="100%">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            style={{ flex: 1 }}
          >
            {cancelLabel}
          </Button>
          <button
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: "8px",
              background: styles.confirmBg,
              color: "white",
              fontWeight: 600,
              fontSize: "14px",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
              transition: "all 0.2s"
            }}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Processando..." : confirmLabel}
          </button>
        </Flex>
      </Flex>
    </Modal>
  )
}
