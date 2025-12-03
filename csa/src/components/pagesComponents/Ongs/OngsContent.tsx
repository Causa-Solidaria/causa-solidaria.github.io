"use client"

import { useState } from "react"
import { Box, Flex } from "csa/components/ui"
import { AlignFull } from "csa/lib/utils"
import { st, DISPLAY_BASE } from "./utils"
import OngsHeader from "./OngsHeader"
import OngsSearch from "./OngsSearch"
import OngsList from "./OngsList"
import { useOngsData, useOngsFilter } from "./useOngsData"

export default function OngsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const { ongs, loading } = useOngsData()
  const filteredOngs = useOngsFilter(ongs, searchQuery)

  return (
    <Box
      borderRadius={st(25)}
      m={{ base: st(20), md: st(100) }}
      w={{ base: "95%", md: "90%" }}
      maxW={st(DISPLAY_BASE * 0.9)}
      minH={st(DISPLAY_BASE * 0.4)}
      p={{ base: st(20), md: st(40) }}
      bg="white"
    >
      <OngsHeader />
      
      <OngsSearch 
        value={searchQuery} 
        onChange={setSearchQuery} 
      />

      <Flex
        dir="column"
        {...AlignFull()}
        gap={st(40)}
      >
        <OngsList 
          ongs={filteredOngs} 
          loading={loading} 
          searchQuery={searchQuery}
        />
      </Flex>
    </Box>
  )
}
