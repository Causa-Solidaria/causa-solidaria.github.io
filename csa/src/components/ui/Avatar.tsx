"use client"

import { Box, Image } from "@chakra-ui/react"
import { useState } from "react"

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

interface AvatarProps {
  src?: string
  name?: string
  size?: AvatarSize
  borderRadius?: "full" | "md" | "lg"
}

const sizeStyles = {
  xs: { size: "24px", fontSize: "10px" },
  sm: { size: "32px", fontSize: "12px" },
  md: { size: "40px", fontSize: "14px" },
  lg: { size: "48px", fontSize: "16px" },
  xl: { size: "64px", fontSize: "20px" },
  "2xl": { size: "96px", fontSize: "32px" }
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
  const styles = sizeStyles[size]
  
  const showFallback = !src || imageError
  const initials = name ? getInitials(name) : "?"
  const bgColor = name ? stringToColor(name) : "#A0AEC0"

  if (showFallback) {
    return (
      <Box
        width={styles.size}
        height={styles.size}
        borderRadius={borderRadius}
        bg={bgColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
        fontSize={styles.fontSize}
        fontWeight={600}
        flexShrink={0}
      >
        {initials}
      </Box>
    )
  }

  return (
    <Box
      width={styles.size}
      height={styles.size}
      borderRadius={borderRadius}
      overflow="hidden"
      flexShrink={0}
    >
      <Image
        src={src}
        alt={name || "Avatar"}
        width="100%"
        height="100%"
        objectFit="cover"
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
  const styles = sizeStyles[size]
  const childArray = Array.isArray(children) ? children : [children]
  const visibleCount = max ? Math.min(max, childArray.length) : childArray.length
  const extraCount = childArray.length - visibleCount

  return (
    <Box display="flex" alignItems="center">
      {childArray.slice(0, visibleCount).map((child, index) => (
        <Box
          key={index}
          marginLeft={index > 0 ? "-8px" : 0}
          border="2px solid white"
          borderRadius="full"
        >
          {child}
        </Box>
      ))}
      {extraCount > 0 && (
        <Box
          marginLeft="-8px"
          width={styles.size}
          height={styles.size}
          borderRadius="full"
          bg="#E2E8F0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize={styles.fontSize}
          fontWeight={600}
          color="#4A5568"
          border="2px solid white"
        >
          +{extraCount}
        </Box>
      )}
    </Box>
  )
}
