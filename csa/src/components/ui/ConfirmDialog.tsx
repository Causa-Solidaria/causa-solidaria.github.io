"use client"

import { ReactNode } from "react"
import Modal from "./Modal"
import Flex from "./Flex"
import Button from "./Button"
import { Box } from "@chakra-ui/react"
import styles from "./ui.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames"

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

const variantIconColors = {
  danger: "#E53E3E",
  warning: "#DD6B20",
  info: "#4C1D95"
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
  const iconColor = variantIconColors[variant]
  const confirmButtonClass = 
    variant === "danger" ? styles.confirmButtonDanger :
    variant === "warning" ? styles.confirmButtonWarning : styles.confirmButtonInfo

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <Flex dir="column" className={styles.confirmDialog}>
        <Box className={styles.confirmDialogIcon}>
          <WarningIcon color={iconColor} />
        </Box>

        <Box className={styles.confirmDialogTitle}>
          {title}
        </Box>

        <Box className={styles.confirmDialogDescription}>
          {message}
        </Box>

        <Flex dir="row" className={styles.confirmDialogActions}>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <button
            className={MergeClassnames(styles.button, styles.confirmButton, confirmButtonClass)}
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
