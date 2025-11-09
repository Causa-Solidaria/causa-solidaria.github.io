'use client'

import DefaultPage from "csa/components/DefaultPage"
import Link from "next/link"
import { Campanhas } from "csa/Rotas.json"
import { Box, Button, Container, Heading, HStack, Icon, Image, SimpleGrid, Stack, Text, VStack } from "@chakra-ui/react"
import { LuArrowRight, LuCheck, LuHandshake, LuHeart, LuInfo, LuMegaphone, LuUser, LuPlus } from "react-icons/lu"
import { staticPosition } from "csa/utils/staticPosition"

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
      <Box
        bgImg={"url('./solidariedade-694x459 1.png')"}
        bgSize="cover"
        bgPos="center"
        minH={staticPosition(400)}
        w={"100%"}
        px={staticPosition(20)}
        py={staticPosition(6)}
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
          maxW={["100%"]}
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
          <Link href={Campanhas.Home}>
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
          templateColumns={["1fr","1fr","1fr","1fr 2fr 1fr"]}
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
            <Link href={Campanhas.Home}>
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
              { title: "doando", description: "contribua com qualquer valor", buttonText: "doar agora", image: "/pngegg (1) 2.png", link: Campanhas.Home },
              { title: "voluntariando-se", description: "participe das ações presenciais", buttonText: "quero me voluntariar", image: "/pngegg (6) 2.png", link: Campanhas.Home },
              { title: "compartilhando", description: "compartilhe nossas campanhas", buttonText: "compartilhar", image: "/pngegg 3.png", link: Campanhas.Home }
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

