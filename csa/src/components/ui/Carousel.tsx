import { Box, Flex } from "@chakra-ui/react"
import { useState, useRef, useEffect, ReactNode, useCallback } from "react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import styles from "./ui.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames"

// ===== TIPOS =====

export interface CarouselProps {
  children: ReactNode
  /** Número de itens visíveis por vez */
  itemsPerView?: number
  /** Gap entre os itens em pixels */
  gap?: number
  /** Mostrar botões de navegação */
  showNavigation?: boolean
  /** Mostrar indicadores de página (dots) */
  showDots?: boolean
  /** Auto play em milissegundos (0 para desativar) */
  autoPlay?: number
  /** Loop infinito */
  loop?: boolean
  /** Classe CSS adicional */
  className?: string
}

export interface CarouselItemProps {
  children: ReactNode
}

// ===== CAROUSEL ITEM =====

export function CarouselItem({ children}: CarouselItemProps) {
  return (
    <Box className={styles.carouselItem}>
      {children}
    </Box>
  )
}

// ===== CAROUSEL =====

export function Carousel({
  children,
  itemsPerView = 3,
  gap = 16,
  showNavigation = true,
  showDots = true,
  autoPlay = 0,
  loop = false,
  className,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Calcula o número total de itens
  const items = Array.isArray(children) ? children : [children]
  const totalItems = items.length
  const maxIndex = Math.max(0, totalItems - itemsPerView)

  // Navegação
  const goTo = useCallback((index: number) => {
    if (loop) {
      if (index < 0) {
        setCurrentIndex(maxIndex)
      } else if (index > maxIndex) {
        setCurrentIndex(0)
      } else {
        setCurrentIndex(index)
      }
    } else {
      setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))
    }
  }, [loop, maxIndex])

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo])
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo])

  // Auto play
  useEffect(() => {
    if (autoPlay > 0 && !isHovered) {
      const interval = setInterval(goNext, autoPlay)
      return () => clearInterval(interval)
    }
  }, [autoPlay, isHovered, goNext])

  // Calcula a largura do item
  const getItemWidth = () => {
    if (!containerRef.current) return 0
    const containerWidth = containerRef.current.offsetWidth
    return (containerWidth - gap * (itemsPerView - 1)) / itemsPerView
  }

  // Calcula o offset de translação
  const getTranslateX = () => {
    const itemWidth = getItemWidth()
    return -(currentIndex * (itemWidth + gap))
  }

  // Indicadores (dots)
  const totalPages = Math.ceil(totalItems / itemsPerView)
  const currentPage = Math.floor(currentIndex / itemsPerView)

  return (
    <Box
      className={MergeClassnames(styles.carousel, className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container principal */}
      <Box ref={containerRef} className={styles.carouselContainer}>
        <Flex
          ref={trackRef}
          className={styles.carouselTrack}
          style={{ transform: `translateX(${getTranslateX()}px)` }}
        >
          {items.map((item, index) => (
            <Box
              key={index}
              className={styles.carouselItem}
              style={{ width: `calc((100% - ${gap * (itemsPerView - 1)}px) / ${itemsPerView})` }}
            >
              {item}
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Navegação */}
      {showNavigation && totalItems > itemsPerView && (
        <>
          <button
            aria-label="Anterior"
            className={MergeClassnames(styles.carouselNav, styles.carouselNavPrev)}
            onClick={goPrev}
            disabled={!loop && currentIndex === 0}
          >
            <LuChevronLeft />
          </button>

          <button
            aria-label="Próximo"
            className={MergeClassnames(styles.carouselNav, styles.carouselNavNext)}
            onClick={goNext}
            disabled={!loop && currentIndex >= maxIndex}
          >
            <LuChevronRight />
          </button>
        </>
      )}

      {/* Dots / Indicadores */}
      {showDots && totalPages > 1 && (
        <Flex className={styles.carouselDots}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={MergeClassnames(
                styles.carouselDot,
                currentPage === index ? styles.carouselDotActive : undefined
              )}
              onClick={() => goTo(index * itemsPerView)}
              aria-label={`Ir para página ${index + 1}`}
            />
          ))}
        </Flex>
      )}
    </Box>
  )
}

export default Carousel
