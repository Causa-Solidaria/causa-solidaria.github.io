'use client'

import DefaultPage from "csa/components/DefaultPage"
import Link from "next/link"
import { Box, Button, Container, Grid, Heading, HStack, Icon, Image, SimpleGrid, Stack, Text, VStack } from "@chakra-ui/react"
import { LuArrowRight, LuCheck, LuHandshake, LuHeart, LuInfo, LuMegaphone, LuUser, LuPlus } from "react-icons/lu"

export default function Home(){



  const ongs = [
    {tile: "Banco De Alimentos", name: "Banco De Alimentos", image: "/logo.png"},
  ]

  return (
    <DefaultPage 
      p={0} 
      bg={"qui"}
      transition="all 0.6s ease"
    >
      {/* <Container maxW={["95%","90%","85%","80%","70%"]} py={6}>
        <Box
          bgImage={["none","none","url('/sol.jpeg')"]}
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

        <Box mt={10}>
          <HStack justify="space-between" align="center" mb={4}>
            <Heading size="md">ONGs em Destaque:</Heading>
            <HStack gap={2}>
              <Link href="/ongs">
                <Button size="sm" variant="ghost" borderRadius="15px">Ver todas</Button>
              </Link>
              <Link href="/criar_nova_ong" aria-label="Criar nova ONG">
                <Button size="sm" bg={"sec"} borderRadius="15px" boxShadow="sm">
                  <HStack gap={2}>
                    <Icon as={LuPlus} />
                    <Text color="white">Criar ONG</Text>
                  </HStack>
                </Button>
              </Link>
            </HStack>
          </HStack>
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

        <Box mt={12}>
          <Heading size="md" mb={6}>como você pode ajudar?</Heading>
          <SimpleGrid columns={[1,1,3]} gap={6}>
            <VStack align="start" bg="white" p={4} borderRadius="lg" boxShadow="sm" gap={2}>
              <HStack gap={2}><Icon as={LuMegaphone} color="green.600"/><Heading size="sm">doando</Heading></HStack>
              <Text color="gray.700">contribua com qualquer valor</Text>
              <Link href="/campanhas"><Button variant="ghost" colorScheme="green">doar agora</Button></Link>
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
      </Container> */}

      <Box
        bgImg={"url('./solidariedade-694x459 1.png')"}
        bgSize="cover"
        bgPos="center"
        minH={["400px", "500px", "500px", "500px"]}
        w={"100%"}
        px={[4, 6, 8, 12]}
        py={[6, 8, 12, 16]}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        position="relative"
        _before={{
          content: '""',
          position: "absolute",
          inset: 0,
          bg: "blackAlpha.300",
          backdropFilter: "blur(0.5px)",
          transition: "all 0.3s ease-in-out",
        }}
        transition="all 0.5s ease-in-out"
      >
        <VStack 
          align="start" 
          gap={4} 
          position="relative" 
          zIndex={1}
          maxW={["100%", "90%", "80%", "70%"]}
          transform="auto"
          animation="fadeInUp 0.8s ease-out"
          css={{
            "@keyframes fadeInUp": {
              "0%": {
                opacity: 0,
                transform: "translateY(30px)"
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)"
              }
            }
          }}
        >
          <Text 
            color="white"
            fontFamily={"quicksand"} 
            fontSize={["2xl", "3xl", "4xl", "5xl", "6xl"]}
            fontWeight="bold"
            lineHeight="shorter"
           transform="auto"
            transition="all 0.3s ease-in-out"
            
          >
            transforme pequenos gestos em grandes mudanças
          </Text>
          <Text 
            color="white"
            fontFamily={"quicksand"} 
            fontSize={["lg", "xl", "2xl", "3xl"]}
            fontWeight="medium"
           transition="all 0.3s ease-in-out"
            
          >
            doe amor e compartilhe esperança
          </Text>
          <Link href="/campanhas">
            <Button 
              bg={"sec"}
              color={"white"}
              size={["md", "lg", "lg", "lg"]}
              fontSize={["md", "lg", "xl", "2xl"]}
              fontWeight={"900"}
              px={[6, 8, 10, 12]}
              py={[4, 6, 6, 8]}
              borderRadius="full"
              boxShadow="lg"
              _hover={{ 
                transform: "translateY(-4px) scale(1.05)", 
                boxShadow: "2xl",
              }}
              _active={{
                transform: "translateY(-2px) scale(1.02)",
                transition: "all 0.1s"
              }}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              minW="200px"
            >
              Quero Ajudar
            </Button>
          </Link>
        </VStack>
      </Box>

      <Container  py={[8, 12, 16, 20]}>
        <SimpleGrid 
          columns={[1, 1, 1, 3]} 
          templateColumns={["1fr","1fr",,"1fr 2fr 1fr"]}
          gap={[6, 8, 12, "70px"]} 
          alignItems="start"
          minH={["auto", "auto", "400px"]}
        >
          {/* Imagem */}
          <Box 
            order={[1, 1, 1, 1]}
            transition="all 0.5s ease-in-out"
          >
            <Image 
              src="./ChatGPT Image 11 de ago. de 2025, 15_44_28 2.png" 
              alt="Banco de Alimentos"
              w="calc(100vw * 379/2593)"
              maxW={"379px"}
              mx={["auto", "auto", "auto", "0"]}
              transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            />
          </Box>
          
          {/* Conteúdo Principal */}
          <VStack 
            align={["center", "center", "center", "start"]} 
            gap={[4, 5, 6]} 
            order={[1, 1, 1, 2]}
            textAlign={["center", "center", "center", "left"]}
          >
            <Heading
              fontSize={["xl", "2xl", "3xl", "4xl"]}
              fontFamily={"quicksand"}
              lineHeight="shorter"
              transition="all 0.3s ease-in-out"
            >
              Nossa missão é espalhar cuidado, dignidade e esperança
            </Heading>
            <Text 
              fontSize={["md", "lg", "xl"]} 
              lineHeight="relaxed"
              transition="all 0.3s ease-in-out"
            >
              somos uma organização que acredita no poder da empatia, atuamos com campanhas de arrecadação de alimentos, brinquedos, agasalhos e apoio a comunidades vulneráveis em todo o brasil
            </Text>
            <Link href="/campanhas">
              <Button 
                variant="ghost" 
                color="sec"
                size={["md", "lg"]}
                fontSize={["md", "lg"]}
                
                _active={{
                  transform: "translateX(4px)",
                  transition: "all 0.1s"
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                <HStack gap={2}>
                  <Text transition="all 0.3s ease">Conheça Nossas Ações</Text>
                  <Icon 
                    as={LuArrowRight} 
                    transition="all 0.3s ease"
                    _groupHover={{ transform: "translateX(4px)" }}
                  />
                </HStack>
              </Button>
            </Link>
          </VStack>

          {/* Seção de Ajuda e Suporte */}
          <Stack 
            direction={["row", "row", "row", "column"]}
            gap={[4, 6]}
            order={[3, 3, 3, 3]}
            w="100%"
            justifyContent={"center"}
            alignContent={"center"}
            alignItems={"center"}
            justifyItems={"center"}
          >
            {[
              { 
                id: 1, title: "precisa de ajuda?", 
                image: "pngegg (7) 2.png" 
              },
              { 
                id: 2, title: "suporte em libras", 
                image: "pngegg (8) 2.png" 
              }
            ].map((item, idx) => (
              <Box
                key={item.id}
                bg="white"
                p={[4, 6, 8]}
                borderColor="gray.100"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                <HStack gap={3} align="center">
                  <Image 
                    src={item.image}
                    alt={item.title}
                    w={["50px", "60px", "80px"]}
                    h={["50px", "60px", "80px"]}
                    objectFit="contain"
                    transition="all 0.3s ease"
                  />
                  <Text
                    fontSize={["lg", "xl", "2xl"]}
                    fontWeight="bold"
                    color="gray.800"
                    lineHeight="shorter"
                  >
                    {item.title}
                  </Text>
                </HStack>
              </Box>
            ))}
          </Stack>
        </SimpleGrid>
      </Container>
      <Container>
        <Heading
          fontSize={["2xl", "3xl", "3xl"]}
          fontFamily={"quicksand"}
          fontWeight="bold"
          color={"sec"}
        >
          ONGs em Destaque:
        </Heading>
        {ongs.length === 0 && (
          <Text mt={4} >Nenhuma ONG cadastrada no momento.</Text>
        )}
        <SimpleGrid 
          columns={[2, 3, 4, 5]} 
          gap={6} 
          mt={6}
          maxW="100%"
        >
          {ongs.slice(0, 5).map((ong, idx) => (
            <VStack 
              key={idx} 
              bg="white" 
              p={4} 
              borderRadius="lg" 
              boxShadow="sm" 
              gap={3}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "xl"
              }}
            >
              <Image 
                src="/logo.png" 
                alt={ong.name} 
                boxSize="64px" 
                objectFit="contain"
                transition="all 0.3s ease"
                _hover={{ transform: "scale(1.1)" }}
              />
              <Text 
                textAlign="center" 
                fontWeight="medium"
                fontSize="sm"
              >
                {ong.name}
              </Text>
              <Button 
                size="sm" 
                variant="outline" 
                colorScheme="green"
                _hover={{
                  bg: "sec",
                  transform: "translateY(-2px)"
                }}
                transition="all 0.2s ease"
              >
                Saiba Mais
              </Button>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>

      <Container>
        <SimpleGrid
          columns={[1, 1, 1, 3]}
        >
          {[
            { title: "doando", description: "contribua com qualquer valor", buttonText: "doar agora", image: "/pngegg (1) 2.png", link: "/campanhas" },
            { title: "voluntariando-se", description: "participe das ações presenciais", buttonText: "quero me voluntariar", image: "/pngegg (6) 2.png", link: "/campanhas" },
            { title: "compartilhando", description: "compartilhe nossas campanhas", buttonText: "compartilhar", image: "/pngegg 3.png", link: "/campanhas" }
          ].map((item, idx) => (
            <HStack key={idx}>
              <Image 
                src={item.image} 
                alt={item.title}
                w="calc(100vw * 81/2593)" 
                maxW={"81px"}
                aspectRatio={1}
              />
              <VStack align="start" gap={2}>
                <Heading size="sm">{item.title}</Heading>
                <Text>{item.description}</Text>
                <Link href={item.link}><Button variant="ghost" colorScheme="green">{item.buttonText}</Button></Link>
              </VStack>
            </HStack>
          ))}

        </SimpleGrid>
      </Container>
    </DefaultPage>
  )
}

