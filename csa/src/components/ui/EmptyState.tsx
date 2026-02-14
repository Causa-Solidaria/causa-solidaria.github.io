"use client"

import { Box } from "@chakra-ui/react"
import { ReactNode } from "react"
import { LuInbox } from "react-icons/lu"
import {Flex, Button} from "./index"
import styles from "./ui.module.css"

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export default function EmptyState({
  icon,
  title,
  description,
  action
}: EmptyStateProps) {
  return (
    <Flex 
      dir="column" 
      className={styles.emptyState}
    >
      <Box className={styles.emptyStateIcon}>
        {icon || <LuInbox size={64} />}
      </Box>
      
      <Box className={styles.emptyStateTitle}>
        {title}
      </Box>
      
      {description && (
        <Box className={styles.emptyStateDescription}>
          {description}
        </Box>
      )}
      
      {action && (
        <Button className={styles.emptyStateAction} onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </Flex>
  )
}
