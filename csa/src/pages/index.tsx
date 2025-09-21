'use client'

import DefaultPage from "csa/components/DefaultPage"
import Link from "next/link"
import { Box, Button, Container, Heading, HStack, Icon, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { LuArrowRight, LuCheck, LuHandshake, LuHeart, LuInfo, LuMegaphone, LuUser } from "react-icons/lu"

export default function Home(){
  return (
    <DefaultPage>
      <Container maxW={["95%","90%","85%","80%","70%"]} py={6}>
        {/* HERO */}
        <Box
          bgImage={["none","none","url('/logo.png')"]}
          bgSize="cover"
          bgPos="center"
          borderRadius="xl"
          p={[6,8,10]}
          minH={["220px","260px","320px"]}
          position="relative"
          overflow="hidden"
        >
          <Box position="absolute" inset={0} bgGradient="linear(to-b, rgba(0,0,0,0.2), rgba(0,0,0,0.55))" borderRadius="xl"/>
          <VStack align="start" gap={3} position="relative" zIndex={1} color="white" maxW={["100%","80%","60%"]}>
            <Heading size="xl" color="white" lineHeight={1.1}>
              transforme pequenos gestos em grandes mudanças
            </Heading>
            <Text color="white">doe amor e compartilhe esperança</Text>
            <Link href="/criar_campanha">
              <Button colorScheme="green" onClick={() => { window.location.href = '/campanhas' }}>
                <HStack gap={2}>
                  <Icon as={LuHeart} />
                  <Text color="white">Quero Ajudar</Text>
                </HStack>
              </Button>
            </Link>
          </VStack>
        </Box>

        {/* MISSÃO + AJUDA RAPIDA */}
        <SimpleGrid columns={[1,1,1,12]} gap={6} mt={8}>
          <Box gridColumn={["auto","auto","auto","1/ span 8"]} bg="white" borderRadius="xl" p={[4,6]} boxShadow="sm">
            <HStack align="start" gap={4}>
              <Icon as={LuHandshake} boxSize={10} color="green.500" />
              <VStack align="start" gap={2}>
                <Heading size="lg">Nossa missão é espalhar cuidado, dignidade e esperança</Heading>
                <Text color="gray.700">
                  somos uma organização que acredita no poder da empatia, atuamos com campanhas de arrecadação de alimentos, brinquedos, agasalhos e apoio a comunidades vulneráveis em todo o brasil
                </Text>
                <Link href="/campanhas">
                  <Button variant="ghost" colorScheme="green">
                    <HStack gap={2}>
                      <Text>Conheça Nossas Ações</Text>
                      <Icon as={LuArrowRight} />
                    </HStack>
                  </Button>
                </Link>
              </VStack>
            </HStack>
          </Box>

          <VStack gridColumn={["auto","auto","auto","span 4"]} gap={4}>
            <Box w="100%" p={4} borderRadius="lg" bg="white" boxShadow="sm">
              <HStack gap={3}>
                <Icon as={LuInfo} boxSize={6} color="green.600"/>
                <VStack align="start" gap={0}>
                  <Text fontWeight="bold">Precisa De Ajuda?</Text>
                  <Text color="gray.600" fontSize="sm">fale com nossa equipe</Text>
                </VStack>
              </HStack>
            </Box>
            <Box w="100%" p={4} borderRadius="lg" bg="white" boxShadow="sm">
              <HStack gap={3}>
                <Icon as={LuUser} boxSize={6} color="green.600"/>
                <VStack align="start" gap={0}>
                  <Text fontWeight="bold">Suporte em Libras</Text>
                  <Text color="gray.600" fontSize="sm">acessibilidade no atendimento</Text>
                </VStack>
              </HStack>
            </Box>
          </VStack>
        </SimpleGrid>

        {/* ONGs EM DESTAQUE */}
        <Box mt={10}>
          <Heading size="md" mb={4}>ONGs em Destaque:</Heading>
          <SimpleGrid columns={[2,3,4,4]} gap={6}>
            {["Banco De alimentos","Amigos Do Bem","mochila cheia de sonhos","Anjos Da Noite"].map((nome, idx) => (
              <VStack key={idx} bg="white" p={4} borderRadius="lg" boxShadow="sm" gap={3}>
                <Image src="/logo.png" alt={nome} boxSize="64px" objectFit="contain"/>
                <Text textAlign="center">{nome}</Text>
                <Button size="sm" variant="outline" colorScheme="green">Saiba Mais</Button>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>

        {/* COMO AJUDAR */}
        <Box mt={12}>
          <Heading size="md" mb={6}>como você pode ajudar?</Heading>
          <SimpleGrid columns={[1,1,3]} gap={6}>
            <VStack align="start" bg="white" p={4} borderRadius="lg" boxShadow="sm" gap={2}>
              <HStack gap={2}><Icon as={LuMegaphone} color="green.600"/><Heading size="sm">doando</Heading></HStack>
              <Text color="gray.700">contribua com qualquer valor</Text>
              <Link href="/criar_campanha"><Button variant="ghost" colorScheme="green">doar agora</Button></Link>
            </VStack>
            <VStack align="start" bg="white" p={4} borderRadius="lg" boxShadow="sm" gap={2}>
              <HStack gap={2}><Icon as={LuCheck} color="green.600"/><Heading size="sm">voluntariando-se</Heading></HStack>
              <Text color="gray.700">participe das ações presenciais</Text>
              <Link href="#"><Button variant="ghost" colorScheme="green">quero me voluntariar</Button></Link>
            </VStack>
            <VStack align="start" bg="white" p={4} borderRadius="lg" boxShadow="sm" gap={2}>
              <HStack gap={2}><Icon as={LuHeart} color="green.600"/><Heading size="sm">doando</Heading></HStack>
              <Text color="gray.700">compartilhe nossas campanhas</Text>
              <Link href="#"><Button variant="ghost" colorScheme="green">compartilhar</Button></Link>
            </VStack>
          </SimpleGrid>
        </Box>
      </Container>
    </DefaultPage>
  )
}