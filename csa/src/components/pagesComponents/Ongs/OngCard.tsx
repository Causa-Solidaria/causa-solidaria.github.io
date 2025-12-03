"use client"

import { Button, Text } from "@chakra-ui/react"
import Link from "next/link"
import { Box, Flex, Avatar, Badge } from "csa/components/ui"
import { ONGs, Campanhas } from "csa/Rotas.json"
import { st, stH } from "./utils"
import type { Ong } from "./types"

type OngCardProps = {
  ong: Ong
}

export default function OngCard({ ong }: OngCardProps) {
  return (
    <Box
      bg="white"
      p={{ base: st(20), md: st(40) }}
      borderRadius={st(30)}
      border={`${st(2)} solid #000`}
      boxShadow={`0 ${st(10)} ${st(25)} rgba(0,0,0,0.08)`}
      w={{ base: "100%", sm: "48%", lg: st(600) }}
      minW={{ base: "auto", md: st(400) }}
      _hover={{
        boxShadow: `0 ${st(15)} ${st(35)} rgba(0,0,0,0.12)`,
        transform: "translateY(-2px)",
        transition: "all 0.2s"
      }}
    >
      {/* Header do Card */}
      <Flex
        dir="row"
        alignItems="flex-start"
        gap={st(30)}
        mb={st(20)}
      >
        <Avatar 
          name={ong.nome} 
          size="xl"
        />
        <Flex
          dir="column"
          gap={st(10)}
          alignItems="flex-start"
          flex={1}
        >
          <Text
            fontWeight="bold"
            fontSize={{ base: st(28), md: st(40) }}
            lineClamp={2}
          >
            {ong.nome}
          </Text>
          <Badge variant="primary" size="md">
            {ong.area}
          </Badge>
        </Flex>
      </Flex>

      {/* Descrição */}
      <Text
        fontSize={{ base: st(20), md: st(28) }}
        color="gray.800"
        mb={st(20)}
        lineClamp={3}
      >
        {ong.descricao}
      </Text>

      {/* Localização */}
      <Text
        fontSize={{ base: st(18), md: st(26) }}
        color="gray.700"
        mb={st(10)}
      >
        {ong.cidade}, {ong.uf}
      </Text>

      {/* Email */}
      <Text
        fontSize={{ base: st(16), md: st(24) }}
        color="gray.600"
        mb={st(30)}
        lineClamp={1}
      >
        {ong.email}
      </Text>

      {/* Botões de ação */}
      <Flex
        dir="row"
        gap={st(20)}
        flexWrap="wrap"
      >
        <Link href={`${ONGs.Home}/${ong.id}`}>
          <Button
            variant="outline"
            borderRadius={st(25)}
            fontSize={{ base: st(20), md: st(26) }}
            border={`${st(2)} solid #000`}
            bg="white"
            color="#000"
            px={{ base: st(20), md: st(30) }}
            {...stH(70)}
            _hover={{ bg: "gray.50" }}
          >
            Ver Detalhes
          </Button>
        </Link>
        <Link href={Campanhas.Home}>
          <Button
            borderRadius={st(25)}
            fontSize={{ base: st(20), md: st(26) }}
            bg="sec"
            color="white"
            px={{ base: st(20), md: st(30) }}
            {...stH(70)}
            _hover={{ opacity: 0.9 }}
          >
            Apoiar
          </Button>
        </Link>
      </Flex>
    </Box>
  )
}
