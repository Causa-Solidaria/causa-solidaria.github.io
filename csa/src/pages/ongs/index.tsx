'use client'

import DefaultPage from '../../components/DefaultPage'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Box, Button, Container, Heading, HStack, Icon, Input, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { LuArrowLeft, LuBookOpen, LuLeaf, LuPawPrint, LuSearch, LuStethoscope } from 'react-icons/lu'
import { useMemo, useState } from 'react'

type Ong = {
  id: string
  nome: string
  area: string
  descricao: string
  cidade: string
  uf: string
  email: string
  icon: any
  color: string
}

const ONGS: Ong[] = [
  
    
]

export default function ONGsPage() {
  const router = useRouter()
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return ONGS
    return ONGS.filter((o) =>
      o.nome.toLowerCase().includes(query) || o.area.toLowerCase().includes(query)
    )
  }, [q])

  return (
    <DefaultPage bg={"qui"}>
      <Container maxW={["95%","90%","85%","80%","70%"]} py={6}>
        {/* Top bar: back, title, create */}
        <HStack justify="space-between" align="center" mb={4}>
          <Button variant="ghost" onClick={() => router.back()}>
            <HStack gap={2}>
              <Icon as={LuArrowLeft} />
              <Text>Voltar</Text>
            </HStack>
          </Button>
          <Heading size="lg">ONG</Heading>
          <Link href="/criar_nova_ong">
            <Button bg={"ter"} borderRadius="15px">Cadastrar ONG</Button>
          </Link>
        </HStack>

        {/* Search */}
        <Box position="relative" mb={6} border={"1px solid"} borderColor={"ter"} borderRadius="15px">
          <Icon as={LuSearch} color="ter" position="absolute" left={3} top="50%" transform="translateY(-50%)" />
          <Input
            pl={10}
            borderRadius="15px"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Pesquisar ONG Por Nome Ou Área"
            bg="white"
          />
        </Box>

        {/* Cards grid */}
        <SimpleGrid columns={[1, 1, 2, 2]} gap={6}>
          {list.map((o) => (
            <Box key={o.id} bg="white" p={4} borderRadius="lg" boxShadow="sm" borderWidth="1px">
              <HStack align="start" gap={3} mb={2}>
                <Box
                  bg={o.color}
                  color="white"
                  borderRadius="full"
                  boxSize="32px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={o.icon} />
                </Box>
                <VStack align="start" gap={0}>
                  <Text fontWeight="bold">{o.nome}</Text>
                  <Text fontSize="sm" color="gray.600">{o.area}</Text>
                </VStack>
              </HStack>
              <Text fontSize="sm" color="gray.800" mb={2}>{o.descricao}</Text>
              <Text fontSize="sm" color="gray.700">{o.cidade}, {o.uf}</Text>
              <Text fontSize="sm" color="gray.600" mb={4}>{o.email}</Text>
              <HStack>
                <Link href="#">
                  <Button size="sm" variant="outline" borderRadius="15px" colorScheme="gray">Ver Detalhes</Button>
                </Link>
                <Link href="/campanhas">
                  <Button size="sm" borderRadius="15px" bg="sec">Apoiar</Button>
                </Link>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </DefaultPage>
  )
}
