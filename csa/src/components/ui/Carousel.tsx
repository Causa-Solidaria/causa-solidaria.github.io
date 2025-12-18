import { Box, IconButton, Flex } from "@chakra-ui/react"
import { useState, useRef, useEffect, ReactNode, useCallback } from "react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

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
    <Box
      flex="0 0 auto"
    >
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
      position="relative"
      width="100%"
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container principal */}
      <Box
        ref={containerRef}
        overflow="hidden"
        width="100%"
      >
        <Flex
          ref={trackRef}
          gap={`2vmax`}
          transition="transform 0.3s ease-in-out"
          style={{ transform: `translateX(${getTranslateX()}px)` }}
        >
          {items.map((item, index) => (
            <Box
              key={index}
              flex="0 0 auto"
              width={`calc((100% - ${gap * (itemsPerView - 1)}px) / ${itemsPerView})`}
            >
              {item}
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Navegação */}
      {showNavigation && totalItems > itemsPerView && (
        <>
          <IconButton
            aria-label="Anterior"
            position="absolute"
            left="-12px"
            top="50%"
            transform="translateY(-50%)"
            rounded="full"
            size="sm"
            bg="white"
            shadow="md"
            _hover={{ bg: "gray.100" }}
            onClick={goPrev}
            disabled={!loop && currentIndex === 0}
            opacity={!loop && currentIndex === 0 ? 0.5 : 1}
            zIndex={10}
          >
            <LuChevronLeft />
          </IconButton>

          <IconButton
            aria-label="Próximo"
            position="absolute"
            right="-12px"
            top="50%"
            transform="translateY(-50%)"
            rounded="full"
            size="sm"
            bg="white"
            shadow="md"
            _hover={{ bg: "gray.100" }}
            onClick={goNext}
            disabled={!loop && currentIndex >= maxIndex}
            opacity={!loop && currentIndex >= maxIndex ? 0.5 : 1}
            zIndex={10}
          >
            <LuChevronRight />
          </IconButton>
        </>
      )}

      {/* Dots / Indicadores */}
      {showDots && totalPages > 1 && (
        <Flex
          justify="center"
          gap={2}
          mt={4}
        >
          {Array.from({ length: totalPages }).map((_, index) => (
            <Box
              key={index}
              as="button"
              w={currentPage === index ? "24px" : "8px"}
              h="8px"
              rounded="full"
              bg={currentPage === index ? "green.500" : "gray.300"}
              transition="all 0.2s"
              onClick={() => goTo(index * itemsPerView)}
              _hover={{ bg: currentPage === index ? "green.600" : "gray.400" }}
            />
          ))}
        </Flex>
      )}
    </Box>
  )
}

export default Carousel
