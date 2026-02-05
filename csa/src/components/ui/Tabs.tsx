"use client"

import { Box } from "@chakra-ui/react"
import { ReactNode, useState } from "react"
import Flex from "./Flex"
import styles from "./ui.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames"

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

  const getTabClassnames = (isActive: boolean, isDisabled: boolean) => {
    const base = styles.tab
    const disabledClass = isDisabled ? styles.tabDisabled : undefined

    if (variant === "line") {
      return MergeClassnames(base, isActive ? styles.tabLineActive : styles.tabLineInactive, disabledClass)
    }
    if (variant === "enclosed") {
      return MergeClassnames(base, isActive ? styles.tabEnclosedActive : styles.tabEnclosedInactive, disabledClass)
    }
    return MergeClassnames(base, isActive ? styles.tabSoftActive : styles.tabSoftInactive, disabledClass)
  }

  const activeContent = tabs.find(tab => tab.id === activeTab)?.content

  return (
    <Box>
      <Flex 
        dir="row" 
        className={MergeClassnames(
          styles.tabList,
          variant === "line" ? styles.tabListLine : undefined,
          variant === "enclosed" ? styles.tabListEnclosed : undefined,
          variant === "soft" ? styles.tabListSoft : undefined
        )}
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
            className={getTabClassnames(activeTab === tab.id, !!tab.disabled)}
            disabled={tab.disabled}
          >
            {tab.label}
          </button>
        ))}
      </Flex>
      
      <Box className={styles.tabContent}>
        {activeContent}
      </Box>
    </Box>
  )
}
