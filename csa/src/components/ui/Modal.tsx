"use client"

import { Box, Portal } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import { ReactNode } from "react"
import { LuX } from "react-icons/lu"
import Flex from "./Flex"
import Heading from "./heading"
import Button from "./Button"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "full"
  showCloseButton?: boolean
}

const sizeMap = {
  sm: "400px",
  md: "500px",
  lg: "700px",
  xl: "900px",
  full: "95vw"
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Portal>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9998,
            }}
            onClick={onClose}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: sizeMap[size],
                maxWidth: "95vw",
                maxHeight: "90vh",
              }}
            >
              <Box
                bg="white"
                borderRadius="20px"
                boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                overflow="hidden"
              >
                {/* Header */}
                {(title || showCloseButton) && (
                  <Flex
                    dir="row"
                    justifyContent="space-between"
                    alignItems="center"
                    p={4}
                    borderBottom="1px solid"
                    borderColor="gray.200"
                  >
                    {title && (
                      <Heading fontSize={24} fontWeight={700} color="#000">
                        {title}
                      </Heading>
                    )}
                    {showCloseButton && (
                      <Button
                        onClick={onClose}
                        variant="ghost"
                        p={2}
                        borderRadius="full"
                        _hover={{ bg: "gray.100" }}
                      >
                        <LuX size={24} />
                      </Button>
                    )}
                  </Flex>
                )}

                {/* Body */}
                <Box p={6} maxH="70vh" overflowY="auto">
                  {children}
                </Box>
              </Box>
            </motion.div>
          </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  )
}
