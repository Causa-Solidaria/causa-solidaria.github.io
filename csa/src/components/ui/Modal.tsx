"use client"

import { Box, Portal } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import { ReactNode } from "react"
import { LuX } from "react-icons/lu"
import Flex from "./Flex"
import Heading from "./heading"
import Button from "./Button"
import styles from "./ui.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "full"
  showCloseButton?: boolean
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true
}: ModalProps) {
  const sizeClass = 
    size === "sm" ? styles.modalSm :
    size === "md" ? styles.modalMd :
    size === "lg" ? styles.modalLg :
    size === "xl" ? styles.modalXl : styles.modalFull

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
            className={styles.modalOverlay}
            onClick={onClose}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className={MergeClassnames(styles.modalContent, sizeClass)}
            >
              <Box className={styles.modalInner}>
                {/* Header */}
                {(title || showCloseButton) && (
                  <Flex
                    dir="row"
                    className={styles.modalHeader}
                  >
                    {title && (
                      <Heading className={styles.modalTitle}>
                        {title}
                      </Heading>
                    )}
                    {showCloseButton && (
                      <Button
                        onClick={onClose}
                        variant="ghost"
                        className={styles.modalCloseButton}
                      >
                        <LuX size={24} />
                      </Button>
                    )}
                  </Flex>
                )}

                {/* Body */}
                <Box className={styles.modalBody}>
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
