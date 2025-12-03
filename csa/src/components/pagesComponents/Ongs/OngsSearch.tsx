"use client"

import { Icon } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { Box, Input } from "csa/components/ui"
import { st, stH } from "./utils"

type OngsSearchProps = {
  value: string
  onChange: (value: string) => void
}

export default function OngsSearch({ value, onChange }: OngsSearchProps) {
  return (
    <Box
      position="relative"
      mb={st(60)}
      border={`${st(2)} solid`}
      borderColor="ter"
      borderRadius={st(30)}
    >
      <Icon
        as={LuSearch}
        color="ter"
        position="absolute"
        left={st(30)}
        top="50%"
        transform="translateY(-50%)"
        boxSize={{ base: st(28), md: st(40) }}
      />
      <Input
        pl={st(90)}
        borderRadius={st(30)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Pesquisar ONG por nome ou área"
        bg="white"
        fontSize={{ base: st(20), md: st(28) }}
        {...stH(70)}
        borderWidth={0}
      />
    </Box>
  )
}
