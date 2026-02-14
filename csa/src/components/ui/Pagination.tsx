"use client"

import { LuChevronLeft, LuChevronRight, LuChevronsLeft, LuChevronsRight } from "react-icons/lu"
import styles from "./ui.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  siblingCount?: number
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  siblingCount = 1
}: PaginationProps) {
  const generatePageNumbers = () => {
    const pages: (number | "...")[] = []

    pages.push(1)

    const leftSibling = Math.max(currentPage - siblingCount, 2)
    const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1)

    if (leftSibling > 2) {
      pages.push("...")
    }

    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i)
      }
    }

    if (rightSibling < totalPages - 1) {
      pages.push("...")
    }

    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pages = generatePageNumbers()

  const PageButton = ({
    page,
    isActive = false
  }: {
    page: number | "..."
    isActive?: boolean
  }) => (
    <button
      className={MergeClassnames(
        styles.paginationButton,
        isActive ? styles.paginationButtonActive : styles.paginationButtonInactive
      )}
      onClick={() => {
        if (page !== "...") {
          onPageChange(page)
        }
      }}
      disabled={page === "..."}
    >
      {page}
    </button>
  )

  const NavButton = ({
    icon: Icon,
    onClick,
    disabled
  }: {
    icon: typeof LuChevronLeft
    onClick: () => void
    disabled: boolean
  }) => (
    <button
      className={styles.paginationNav}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon size={18} />
    </button>
  )

  return (
    <div className={styles.pagination}>
      {showFirstLast && (
        <NavButton
          icon={LuChevronsLeft}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        />
      )}

      <NavButton
        icon={LuChevronLeft}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      <div className={styles.paginationPages}>
        {pages.map((page, index) => (
          <PageButton
            key={`${page}-${index}`}
            page={page}
            isActive={page === currentPage}
          />
        ))}
      </div>

      <NavButton
        icon={LuChevronRight}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />

      {showFirstLast && (
        <NavButton
          icon={LuChevronsRight}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      )}
    </div>
  )
}

