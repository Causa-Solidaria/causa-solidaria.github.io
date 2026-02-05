"use client"

import { Box, Image } from "@chakra-ui/react"
import { useState } from "react"
import styles from "./ui.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames"

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

interface AvatarProps {
  src?: string
  name?: string
  size?: AvatarSize
  borderRadius?: "full" | "md" | "lg"
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function stringToColor(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const colors = [
    "#4C1D95", // purple
    "#0D9488", // teal
    "#2563EB", // blue
    "#DC2626", // red
    "#16A34A", // green
    "#EA580C", // orange
    "#7C3AED", // violet
    "#DB2777"  // pink
  ]
  return colors[Math.abs(hash) % colors.length]
}

export default function Avatar({ 
  src, 
  name = "", 
  size = "md",
  borderRadius = "full"
}: AvatarProps) {
  const [imageError, setImageError] = useState(false)
  const sizeClass =
    size === "xs" ? styles.avatarXs :
    size === "sm" ? styles.avatarSm :
    size === "md" ? styles.avatarMd :
    size === "lg" ? styles.avatarLg :
    size === "xl" ? styles.avatarXl : styles.avatar2xl
  const radiusClass = 
    borderRadius === "full" ? styles.avatarRoundedFull :
    borderRadius === "md" ? styles.avatarRoundedMd : styles.avatarRoundedLg
  
  const showFallback = !src || imageError
  const initials = name ? getInitials(name) : "?"
  const bgColor = name ? stringToColor(name) : "#A0AEC0"

  if (showFallback) {
    return (
      <Box
        className={MergeClassnames(styles.avatar, styles.avatarFallback, sizeClass, radiusClass)}
        style={{ backgroundColor: bgColor }}
      >
        {initials}
      </Box>
    )
  }

  return (
    <Box
      className={MergeClassnames(styles.avatar, sizeClass, radiusClass)}
    >
      <Image
        className={styles.avatarImage}
        src={src}
        alt={name || "Avatar"}
        onError={() => setImageError(true)}
      />
    </Box>
  )
}

interface AvatarGroupProps {
  children: React.ReactNode
  max?: number
  size?: AvatarSize
}

export function AvatarGroup({ children, max, size = "md" }: AvatarGroupProps) {
  const sizeClass =
    size === "xs" ? styles.avatarXs :
    size === "sm" ? styles.avatarSm :
    size === "md" ? styles.avatarMd :
    size === "lg" ? styles.avatarLg :
    size === "xl" ? styles.avatarXl : styles.avatar2xl
  const childArray = Array.isArray(children) ? children : [children]
  const visibleCount = max ? Math.min(max, childArray.length) : childArray.length
  const extraCount = childArray.length - visibleCount

  return (
    <Box className={styles.avatarGroup}>
      {childArray.slice(0, visibleCount).map((child, index) => (
        <Box
          key={index}
          className={styles.avatarGroupItem}
        >
          {child}
        </Box>
      ))}
      {extraCount > 0 && (
        <Box
          className={MergeClassnames(styles.avatar, styles.avatarFallback, sizeClass, styles.avatarRoundedFull, styles.avatarGroupExtra)}
        >
          +{extraCount}
        </Box>
      )}
    </Box>
  )
}
