"use client"

import DefaultPage from "csa/components/DefaultPage"
import Link from "next/link"
import { Campanhas } from "csa/Rotas.json"
import Box from 'csa/components/ui/Box'
import Heading from 'csa/components/ui/heading'
import Button from 'csa/components/ui/Button'
import Flex from 'csa/components/ui/Flex'
import { Center, Container, HStack, Icon, Image, SimpleGrid, Stack, Text, VStack } from "@chakra-ui/react"
import { BorderRadiusStatic, shadowStatic, SetStaticPositionH, SetStaticPositionW, staticPosition } from 'csa/utils/staticPositions'
import { LuArrowRight } from "react-icons/lu"
import JustifyFull, { AlignFull } from "csa/utils/JustifyFullCenter"
import Rotas from "csa/Rotas.json"

export default function Home(){

  const ongs = [
    {tile: "Banco De Alimentos", name: "Banco De Alimentos", image: "/logo.png"},
  ]

  const MaxSize = 2200
  const st = (s: number | number[])=>(staticPosition as any)(s, MaxSize)
  const sstW = (w: number | string | (number | string)[] = MaxSize)=>(SetStaticPositionW as any)(w, MaxSize)
  const sstH = (h: number | string | (number | string)[] = MaxSize)=>(SetStaticPositionH as any)(h, MaxSize)
  const bordR = (s: number|string)=>BorderRadiusStatic(s, MaxSize)
  const shSt = (x: number, y: number)=>shadowStatic(x, y, 10, "rgba(0,0,0,0.3)", MaxSize)

  return (
    <DefaultPage 
      position={"relative"}
      p={0} 
      bg={"qui"}
      transition="all 0.6s ease"
    >
      <Flex
        dir="column"
        bgImg={"url('./solidariedade-694x459 1.png')"}
        bgSize={"cover"}
        bgPos={"center"}
        backdropBlur={`${st(500)}`}
        p={st(100)}
        {...sstW("full")}
        {...JustifyFull(["center", "center", "left"])}
      >
        <Heading
          textAlign={"left"}
          transition={" font-size 0.6s ease-in-out, width 0.6s ease-in-out "}
          color={"#fff"}
          fontSize={[80]}
          mb={st(30)}
          {...sstW(866)}
          MaxSizeDisplay={MaxSize}
        >
          transforme pequenos gestos em grandes mudanças
        </Heading>
        <Heading
          textAlign={"left"}
          transition={"padding 0.6s ease-in-out, margin 0.6s ease-in-out, font-size 0.6s ease-in-out "}
          color={"#fff"}
          fontSize={40}
          mb={st(30)}
          {...sstW(856)}
          MaxSizeDisplay={MaxSize}
        >
          doe amor e compartilhe esperança
        </Heading>
        <Button
          {...bordR(25)} 
          transition={"all 0.6s ease-in-out"}
          onClick={()=>{window.location.href = Rotas.Campanhas.Home}}
          bg={"#097D03"}
          _hover={{
            bg: "#39aD33",
            scale: 1.01,
            boxShadow: `${st(20)} ${st(20)} ${st(20)} rgba(0,0,0,0.2)`
          }}
          {...sstW(500)}
          {...sstH(125)}
        >
          <Heading

            transition={"all 0.6s ease-in-out"}
            color={"#fff"}
            fontSize={48}
            MaxSizeDisplay={MaxSize}
          >Quero Ajudar</Heading>
        </Button>
      </Flex>

      <Flex
        dir={["column", "column","column", "row"]}

        {...JustifyFull("center")}
        {...AlignFull("center")}
        p={st(100)}
        gap={st(120)}
      >
          <Image 
            src="./ChatGPT Image 11 de ago. de 2025, 15_44_28 2.png" 
            alt="Banco de Alimentos"
            {...sstW(379)}
            transition={"all 0.6s ease-in-out"}
          />
          <Flex dir="column"
            {...JustifyFull(["center","center","center","left"])}
            {...AlignFull(["center","center","center","left"])}
            transition={"all 0.6s ease-in-out"}
          >
            <Heading
              {...sstW(1030)}
              fontSize={64}
              mb={st(60)}
              MaxSizeDisplay={MaxSize}
              transition={"all 0.6s ease-in-out"}
            >
              Nossa missão é espalhar cuidado, dignidade e esperança
            </Heading>
            <Heading
              fontSize={40}
              {...sstW(1030)}
              MaxSizeDisplay={MaxSize}
              transition={"all 0.6s ease-in-out"}
              color="#444"
            >
              somos uma organização que acredita no poder da empatia, atuamos com campanhas de arrecadação de alimentos, brinquedos, agasalhos e apoio a comunidades vulneráveis em todo o brasil
            </Heading>
            <Center>
              <Button 
                bg={"#097D03"}
                _hover={{
                  bg: "#39aD33",
                  scale: 1.01,
                  boxShadow: `${st(20)} ${st(20)} ${st(20)} rgba(0,0,0,0.2)`
                }}
                transition={"all 0.6s ease-in-out"}
                mt={st(60)}
                p={st(40)}
                as="button" 
                aria-label="Conheça Nossas Ações"
                minW={st(620)}
              >
                <Heading 
                color={"#fff"}
                  transition="all 0.6s ease-in-out" 
                  fontSize={40} 
                  MaxSizeDisplay={MaxSize}
                >
                  Conheça Nossas Campanhas
                </Heading>
                <Icon 
                  as={LuArrowRight} 
                  transition="all 0.6s ease-in-out"
                />
            </Button>
          </Center>
        </Flex>
        <Flex
          dir={["row","row","row","column"]}
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
            <Flex key={item.id}
              dir="row"
              p={st(30)}
              transition="all 0.6s ease-in-out"
              alignItems="center"
              m={st(30)}
            >
                <Image 
                  src={item.image}
                  alt={item.title}
                  {...sstW(158)}
                  {...sstH(158)}
                  objectFit="contain"
                  transition="all 0.3s ease"
                />
                <Heading
                  fontSize={40}
                  MaxSizeDisplay={MaxSize}
                  fontWeight="bold"
                  color="gray.800"
                  lineHeight="shorter"
                >
                  {item.title}
                </Heading>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </DefaultPage>
  )
}

