"use client"

import { Box } from "@chakra-ui/react"
import styles from "./ui.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames"

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
}

export function Spinner({ size = "md" }: SpinnerProps) {
  const sizeClass =
    size === "sm" ? styles.spinnerSm :
    size === "lg" ? styles.spinnerLg :
    size === "xl" ? styles.spinnerXl : styles.spinnerMd
  return (
    <Box className={MergeClassnames(styles.spinner, sizeClass)} />
  )
}

interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl"
  text?: string
  fullScreen?: boolean
}

export default function Loading({ size = "md", text, fullScreen = false }: LoadingProps) {
  const content = (
    <Box className={styles.loadingContainer}>
      <Spinner size={size} />
      {text && (
        <Box className={styles.loadingText}>
          {text}
        </Box>
      )}
    </Box>
  )

  if (fullScreen) {
    return (
      <Box className={styles.loadingFullscreen}>
        {content}
      </Box>
    )
  }

  return content
}
