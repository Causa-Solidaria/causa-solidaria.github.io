"use client"

import { Box } from "@chakra-ui/react"
import { ReactNode } from "react"
import styles from "./ui.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames"

interface SkeletonProps {
  w?: string | number
  h?: string | number
  rounded?: "default" | "full"
  children?: ReactNode
  isLoaded?: boolean
}

export default function Skeleton({ 
  w = "100%", 
  h = "20px", 
  rounded = "default",
  children,
  isLoaded = false
}: SkeletonProps) {
  if (isLoaded) {
    return <>{children}</>
  }

  const roundedClass = rounded === "full" ? styles.skeletonRoundedFull : styles.skeletonRounded

  return (
    <Box
      className={MergeClassnames(styles.skeleton, roundedClass)}
      style={{ width: typeof w === 'number' ? `${w}px` : w, height: typeof h === 'number' ? `${h}px` : h }}
    />
  )
}

// Skeleton para texto
export function SkeletonText({ lines = 3, gap = 2 }: { lines?: number; gap?: number }) {
  return (
    <Box className={styles.skeletonText} style={{ gap: `${gap * 0.25}rem` }}>
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
  return <Skeleton w={size} h={size} rounded="full" />
}

// Skeleton para card
export function SkeletonCard() {
  return (
    <Box className={styles.skeletonCard}>
      <Box className={styles.skeletonCardHeader}>
        <SkeletonCircle size="48px" />
        <Box className={styles.skeletonCardHeaderText}>
          <Skeleton h="20px" w="60%" />
          <Skeleton h="14px" w="40%" />
        </Box>
      </Box>
      <SkeletonText lines={3} />
    </Box>
  )
}
