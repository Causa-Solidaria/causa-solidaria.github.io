import { Box, Text, VStack, HStack, Icon } from "@chakra-ui/react"
import { Carousel, Heading } from "csa/components/ui"
import { useOngsData } from "csa/components/pagesComponents/Ongs/useOngsData"
import { LuBuilding2, LuMapPin } from "react-icons/lu"
import type { Ong } from "csa/components/pagesComponents/Ongs/types"

// ===== CARD DE ONG =====

interface OngCardProps {
  ong: Ong
  onClick?: (ong: Ong) => void
}

function OngCard({ ong, onClick }: OngCardProps) {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      p={4}
      shadow="sm"
      border="1px solid"
      borderColor="gray.100"
      cursor={onClick ? "pointer" : "default"}
      transition="all 0.2s"
      _hover={{
        shadow: "md",
        transform: "translateY(-2px)",
        borderColor: "green.200"
      }}
      onClick={() => onClick?.(ong)}
      height="100%"
    >
      <VStack align="start" gap={3}>
        {/* Ícone e Nome */}
        <HStack gap={3}>
          <Box
            p={2}
            bg={`${ong.color || "green.400"}20`}
            borderRadius="lg"
          >
            <Icon 
              as={ong.icon || LuBuilding2} 
              boxSize={6} 
              color={ong.color || "green.400"} 
            />
          </Box>
          <Text fontWeight="bold" fontSize="lg" lineClamp={1}>
            {ong.nome}
          </Text>
        </HStack>

        {/* Área de atuação */}
        {ong.area && (
          <Text
            fontSize="sm"
            color="green.600"
            bg="green.50"
            px={2}
            py={1}
            borderRadius="md"
          >
            {ong.area}
          </Text>
        )}

        {/* Descrição */}
        {ong.descricao && (
          <Text fontSize="sm" color="gray.600" lineClamp={2}>
            {ong.descricao}
          </Text>
        )}

        {/* Localização */}
        {(ong.cidade || ong.uf) && (
          <HStack fontSize="xs" color="gray.500">
            <Icon as={LuMapPin} />
            <Text>
              {[ong.cidade, ong.uf].filter(Boolean).join(", ")}
            </Text>
          </HStack>
        )}
      </VStack>
    </Box>
  )
}

// ===== CARROSSEL DE ONGS =====

export interface CarrosselOngsProps {
  /** Número de ONGs visíveis por vez */
  itemsPerView?: number
  /** Título do carrossel */
  title?: string
  /** Auto play em ms (0 = desativado) */
  autoPlay?: number
  /** Mostrar navegação */
  showNavigation?: boolean
  /** Mostrar indicadores */
  showDots?: boolean
  /** Callback ao clicar em uma ONG */
  onOngClick?: (ong: Ong) => void
}

export default function CarrosselOngs({
  itemsPerView = 5,
  title = "ONGs Parceiras",
  autoPlay = 0,
  showNavigation = true,
  showDots = true,
  onOngClick
}: CarrosselOngsProps) {
  const { ongs, loading, error } = useOngsData()

  // Componente do título
  const TitleComponent = title ? (
    <Heading fontSize="2vmax" m={"2vmax"}>
      {title}
    </Heading>
  ) : null

  if (loading) {
    return (
      <Box m="1vmax" p={"1vmax"}>
        {TitleComponent}
        <Heading textAlign="center" fontSize="1.5vmax" color="gray.500">
          Carregando ONGs...
        </Heading>
      </Box>
    )
  }

  if (error || ongs.length === 0) {
    return (
      <Box m="1vmax" p={"1vmax"}>
        {TitleComponent}
        <Text textAlign="center" color="gray.500" fontSize="1.5vmax">
          {error || "Nenhuma ONG encontrada"}
        </Text>
      </Box>
    )
  }

  return (
    <Box m="3vmax" p={"1.5vmax"}>
      {TitleComponent}
      
      <Carousel
        itemsPerView={itemsPerView}
        gap={20}
        autoPlay={autoPlay}
        showNavigation={showNavigation}
        showDots={showDots}
        loop
      >
        {ongs.map((ong) => (
          <OngCard 
            key={ong.id} 
            ong={ong} 
            onClick={onOngClick}
          />
        ))}
      </Carousel>
    </Box>
  )
}