"use client"

import { Box } from "@chakra-ui/react"
import { LuChevronRight } from "react-icons/lu"
import { useRouter } from "next/router"
import Flex from "./Flex"

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
    <Box color="#fff" fontWeight={"900"} mx={2}>
      {separator || <LuChevronRight size={16} />}
    </Box>
  )

  return (
    <Flex dir="row" alignItems="center" flexWrap="wrap" mb={"2vmax"}>
      {showHomeIcon && (
        <>
          <Box
            as="button"
            display="flex"
            alignItems="center"
            color="#fff" fontWeight={"900"}
            cursor="pointer"
            transition="color 0.2s"
            _hover={{ color: "#008000" }}
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
          <Flex 
            key={index} 
            dir="row" 
            alignItems="center"
          >
            <Box
              as={item.href && !isLast ? "button" : "span"}
              display="flex"
              alignItems="center"
              gap={1}
              fontSize="sm"
              color={isLast ? "#000" : "#fff"} 
              fontWeight={"900"}
              cursor={item.href && !isLast ? "pointer" : "default"}
              transition="color 0.2s"
              _hover={item.href && !isLast ? { color: "#008000" } : {}}
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
