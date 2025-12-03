"use client"

import { Button, Icon } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { LuArrowLeft } from "react-icons/lu"
import { Flex, Heading } from "csa/components/ui"
import { ONGs } from "csa/Rotas.json"
import { st, DISPLAY_BASE } from "./utils"

export default function OngsHeader() {
  const router = useRouter()

  return (
    <Flex
      dir="row"
      justifyContent="space-between"
      alignItems="center"
      mb={st(40)}
      flexWrap="wrap"
      gap={st(20)}
    >
      <Button
        variant="ghost"
        onClick={() => router.back()}
        fontSize={{ base: st(20), md: st(28) }}
        _hover={{ bg: "gray.100" }}
      >
        <Icon
          as={LuArrowLeft}
          boxSize={{ base: st(24), md: st(32) }}
        />
      </Button>

      <Heading
        fontSize={64}
        MaxSizeDisplay={DISPLAY_BASE}
        fontWeight={900}
        color="#000"
      >
        ONGs
      </Heading>

      <Link href={ONGs.Criar}>
        <Button
          bg="ter"
          borderRadius={st(30)}
          fontSize={{ base: st(20), md: st(28) }}
          px={{ base: st(20), md: st(30) }}
          _hover={{ opacity: 0.9 }}
        >
          Cadastrar ONG
        </Button>
      </Link>
    </Flex>
  )
}
