"use client"

import { LuChevronLeft, LuChevronRight, LuChevronsLeft, LuChevronsRight } from "react-icons/lu"

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

  const buttonBaseStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    border: "none",
    background: "transparent",
    transition: "all 0.2s"
  }

  const PageButton = ({ 
    page, 
    isActive = false
  }: { 
    page: number | "..."
    isActive?: boolean
  }) => (
    <button
      style={{
        ...buttonBaseStyle,
        minWidth: "36px",
        height: "36px",
        fontSize: "14px",
        fontWeight: isActive ? 600 : 400,
        background: isActive ? "#4C1D95" : "transparent",
        color: isActive ? "white" : "#4A5568",
        cursor: page === "..." ? "default" : "pointer"
      }}
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
      style={{
        ...buttonBaseStyle,
        width: "36px",
        height: "36px",
        color: "#4A5568",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon size={18} />
    </button>
  )

  const pages = generatePageNumbers()

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
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
      
      <div style={{ display: "flex", gap: "4px", margin: "0 8px" }}>
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
