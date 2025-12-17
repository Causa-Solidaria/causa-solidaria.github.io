"use client"

import { Box } from "@chakra-ui/react"
import { ReactNode } from "react"
import { LuInbox } from "react-icons/lu"
import {Flex, Button, Card} from "./index"

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
      alignItems="center" 
      justifyContent="center"
      py={12}
      px={4}
      textAlign="center"
    >
      <Box 
        color="#A0AEC0" 
        mb={4}
        fontSize="64px"
      >
        {icon || <LuInbox size={64} />}
      </Box>
      
      <Box
        fontSize="xl"
        fontWeight={600}
        color="#2D3748"
        mb={2}
      >
        {title}
      </Box>
      
      {description && (
        <Box
          fontSize="md"
          color="#718096"
          maxW="400px"
          mb={action ? 6 : 0}
        >
          {description}
        </Box>
      )}
      
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </Flex>
  )
}
