"use client"

import { Box } from "@chakra-ui/react"
import { ReactNode, useState } from "react"
import Flex from "./Flex"

interface Tab {
  id: string
  label: string
  content: ReactNode
  disabled?: boolean
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  onChange?: (tabId: string) => void
  variant?: "line" | "enclosed" | "soft"
}

export default function Tabs({
  tabs,
  defaultTab,
  onChange,
  variant = "line"
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onChange?.(tabId)
  }

  const getTabStyles = (isActive: boolean, isDisabled: boolean) => {
    const baseStyles = {
      cursor: isDisabled ? "not-allowed" : "pointer",
      opacity: isDisabled ? 0.5 : 1,
      transition: "all 0.2s"
    }

    switch (variant) {
      case "line":
        return {
          ...baseStyles,
          px: 4,
          py: 3,
          borderBottom: isActive ? "2px solid #4C1D95" : "2px solid transparent",
          color: isActive ? "#4C1D95" : "#718096",
          fontWeight: isActive ? 600 : 400,
          _hover: !isDisabled ? { color: "#4C1D95" } : {}
        }
      case "enclosed":
        return {
          ...baseStyles,
          px: 4,
          py: 2,
          borderRadius: "8px 8px 0 0",
          border: "1px solid",
          borderColor: isActive ? "#E2E8F0" : "transparent",
          borderBottom: isActive ? "1px solid white" : "1px solid #E2E8F0",
          bg: isActive ? "white" : "transparent",
          color: isActive ? "#4C1D95" : "#718096",
          fontWeight: isActive ? 600 : 400,
          mb: "-1px"
        }
      case "soft":
        return {
          ...baseStyles,
          px: 4,
          py: 2,
          borderRadius: "8px",
          bg: isActive ? "#4C1D95" : "transparent",
          color: isActive ? "white" : "#718096",
          fontWeight: isActive ? 600 : 400,
          _hover: !isDisabled && !isActive ? { bg: "#F7FAFC" } : {}
        }
      default:
        return baseStyles
    }
  }

  const activeContent = tabs.find(tab => tab.id === activeTab)?.content

  return (
    <Box>
      <Flex 
        dir="row" 
        borderBottom={variant === "line" ? "1px solid #E2E8F0" : variant === "enclosed" ? "1px solid #E2E8F0" : undefined}
        bg={variant === "soft" ? "#F7FAFC" : undefined}
        p={variant === "soft" ? 1 : 0}
        borderRadius={variant === "soft" ? "12px" : undefined}
        gap={variant === "soft" ? 1 : 0}
      >
        {tabs.map(tab => (
          <Box
            key={tab.id}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
            {...getTabStyles(activeTab === tab.id, !!tab.disabled)}
            fontSize="sm"
          >
            {tab.label}
          </Box>
        ))}
      </Flex>
      
      <Box pt={4}>
        {activeContent}
      </Box>
    </Box>
  )
}
