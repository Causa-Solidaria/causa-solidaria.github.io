"use client"

import { Box } from "@chakra-ui/react"
import { LuChevronRight } from "react-icons/lu"
import { useRouter } from "next/router"
import Flex from "./Flex"
import styles from "./ui.module.css"

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  showHomeIcon?: boolean
}

export default function Breadcrumb({
  items,
  separator,
  showHomeIcon = true
}: BreadcrumbProps) {
  const router = useRouter()

  const handleClick = (href?: string) => {
    if (href) {
      router.push(href)
    }
  }

  const Separator = () => (
    <Box className={styles.breadcrumbSeparator}>
      {separator || <LuChevronRight size={16} />}
    </Box>
  )

  return (
    <Flex dir="row" className={styles.breadcrumb}>
      {showHomeIcon && (
        <>
          <Box
            as="button"
            className={styles.breadcrumbItem}
            onClick={() => handleClick("/")}
          >
            <HomeIcon />
          </Box>
          {items.length > 0 && <Separator />}
        </>
      )}
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        
        return (
          <Flex key={index} dir="row" className={styles.breadcrumbItemWrapper}>
            <Box
              as={item.href && !isLast ? "button" : "span"}
              className={isLast ? styles.breadcrumbItemActive : styles.breadcrumbItem}
              onClick={() => !isLast && handleClick(item.href)}
            >
              {item.icon}
              {item.label}
            </Box>
            
            {!isLast && <Separator />}
          </Flex>
        )
      })}
    </Flex>
  )
}
