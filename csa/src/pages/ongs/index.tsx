'use client'

import { useEffect, useState, useMemo } from "react";
import { Button, Icon, Text } from "@chakra-ui/react";
import Box from "csa/components/ui/Box";
import Flex from "csa/components/ui/Flex";
import Heading from "csa/components/ui/heading";
import Input from "csa/components/ui/input";
import DefaultPage from "csa/components/DefaultPage";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LuArrowLeft, LuLeaf, LuSearch } from 'react-icons/lu';
import { staticPosition, SetStaticPositionW, SetStaticPositionH } from "csa/utils/staticPositions";
import JustifyFull, { AlignFull } from "csa/utils/JustifyFullCenter";
import { ONGs, Campanhas } from "csa/Rotas.json"

const DISPLAY_BASE = 2008;

type Ong = {
  id: string;
  nome: string;
  area: string;
  descricao: string;
  cidade: string;
  uf: string;
  email: string;
  icon: any;
  color: string;
};

export default function ONGsPage() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [ongs, setOngs] = useState<Ong[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOngs() {
      try {
        const res = await fetch('/api/ong_get');
        const data: Ong[] = await res.json();
        const mapped = data.map(o => ({
          ...o,
          icon: LuLeaf,
          color: 'green.400'
        }));
        setOngs(mapped);
      } catch (err) {
        console.error('Erro ao carregar ONGs:', err);
        setOngs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOngs();
  }, []);

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return ongs;
    return ongs.filter(o =>
      o.nome.toLowerCase().includes(query) || o.area.toLowerCase().includes(query)
    );
  }, [q, ongs]);

  return (
    <DefaultPage
      bg={"qui"}
      {...JustifyFull()}
      {...AlignFull()}
    >
      <Box
        mx={"auto"}
        {...SetStaticPositionW(DISPLAY_BASE, DISPLAY_BASE)}
        p={staticPosition(40, DISPLAY_BASE)}
        pt={staticPosition(60, DISPLAY_BASE)}
      >
        {/* Top bar */}
        <Flex
          dir="row"
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={staticPosition(40, DISPLAY_BASE)}
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            fontSize={staticPosition(28, DISPLAY_BASE)}
          >
            <Flex
              dir="row"
              gap={staticPosition(10, DISPLAY_BASE)}
              alignItems={"center"}
            >
              <Icon
                as={LuArrowLeft}
                boxSize={staticPosition(32, DISPLAY_BASE)}
              />
              <Text
                fontSize={staticPosition(32, DISPLAY_BASE)}
              >
                Voltar
              </Text>
            </Flex>
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
              bg={"ter"}
              borderRadius={staticPosition(30, DISPLAY_BASE)}
              fontSize={staticPosition(28, DISPLAY_BASE)}
              px={staticPosition(30, DISPLAY_BASE)}
            >
              Cadastrar ONG
            </Button>
          </Link>
        </Flex>

        {/* Search */}
        <Box
          position="relative"
          mb={staticPosition(60, DISPLAY_BASE)}
          border={`${staticPosition(2, DISPLAY_BASE)} solid`}
          borderColor={"ter"}
          borderRadius={staticPosition(30, DISPLAY_BASE)}
          {...SetStaticPositionW(DISPLAY_BASE, DISPLAY_BASE)}
        >
          <Icon
            as={LuSearch}
            color="ter"
            position="absolute"
            left={staticPosition(30, DISPLAY_BASE)}
            top="50%"
            transform="translateY(-50%)"
            boxSize={staticPosition(40, DISPLAY_BASE)}
          />
          <Input
            pl={staticPosition(90, DISPLAY_BASE)}
            borderRadius={staticPosition(30, DISPLAY_BASE)}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Pesquisar ONG por nome ou área"
            bg="white"
            fontSize={staticPosition(28, DISPLAY_BASE)}
            {...SetStaticPositionH(70, DISPLAY_BASE)}
          />
        </Box>

        {/* Renderização condicional */}
        <Flex
          dir="column"
          {...AlignFull()}
          gap={staticPosition(40, DISPLAY_BASE)}
        >
          {loading ? (
            <Text
              fontSize={staticPosition(32, DISPLAY_BASE)}
            >
              Carregando ONGs...
            </Text>
          ) : list.length === 0 ? (
            <Text
              fontSize={staticPosition(32, DISPLAY_BASE)}
            >
              Nenhuma ONG encontrada.
            </Text>
          ) : (
            <Flex
              dir="row"
              flexWrap="wrap"
              gap={staticPosition(40, DISPLAY_BASE)}
              justifyContent={"center"}
            >
              {list.map((o) => (
                <Box
                  key={o.id}
                  bg="white"
                  p={staticPosition(40, DISPLAY_BASE)}
                  borderRadius={staticPosition(30, DISPLAY_BASE)}
                  border={`${staticPosition(2, DISPLAY_BASE)} solid #000`}
                  boxShadow={`0 ${staticPosition(10, DISPLAY_BASE)} ${staticPosition(25, DISPLAY_BASE)} rgba(0,0,0,0.08)`}
                  {...SetStaticPositionW((DISPLAY_BASE - 200) / 2, DISPLAY_BASE)}
                  minW={staticPosition(600, DISPLAY_BASE)}
                >
                  <Flex
                    dir="row"
                    alignItems="flex-start"
                    gap={staticPosition(30, DISPLAY_BASE)}
                    mb={staticPosition(20, DISPLAY_BASE)}
                  >
                    <Box
                      bg={o.color}
                      color="white"
                      borderRadius={"100%"}
                      {...SetStaticPositionW(80, DISPLAY_BASE)}
                      {...SetStaticPositionH(80, DISPLAY_BASE)}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize={staticPosition(40, DISPLAY_BASE)}
                    >
                      <Icon
                        as={o.icon}
                        boxSize={staticPosition(48, DISPLAY_BASE)}
                      />
                    </Box>
                    <Flex
                      dir="column"
                      gap={staticPosition(10, DISPLAY_BASE)}
                      alignItems="flex-start"
                    >
                      <Text
                        fontWeight="bold"
                        fontSize={staticPosition(40, DISPLAY_BASE)}
                      >
                        {o.nome}
                      </Text>
                      <Text
                        fontSize={staticPosition(28, DISPLAY_BASE)}
                        color="gray.600"
                      >
                        {o.area}
                      </Text>
                    </Flex>
                  </Flex>
                  <Text
                    fontSize={staticPosition(28, DISPLAY_BASE)}
                    color="gray.800"
                    mb={staticPosition(20, DISPLAY_BASE)}
                  >
                    {o.descricao}
                  </Text>
                  <Text
                    fontSize={staticPosition(26, DISPLAY_BASE)}
                    color="gray.700"
                    mb={staticPosition(10, DISPLAY_BASE)}
                  >
                    {o.cidade}, {o.uf}
                  </Text>
                  <Text
                    fontSize={staticPosition(24, DISPLAY_BASE)}
                    color="gray.600"
                    mb={staticPosition(30, DISPLAY_BASE)}
                  >
                    {o.email}
                  </Text>
                  <Flex
                    dir="row"
                    gap={staticPosition(20, DISPLAY_BASE)}
                  >
                    <Link href={`/#ong/${o.id}`}>
                      <Button
                        variant="outline"
                        borderRadius={staticPosition(25, DISPLAY_BASE)}
                        fontSize={staticPosition(26, DISPLAY_BASE)}
                        border={`${staticPosition(2, DISPLAY_BASE)} solid #000`}
                        bg="white"
                        color="#000"
                        px={staticPosition(30, DISPLAY_BASE)}
                        {...SetStaticPositionH(70, DISPLAY_BASE)}
                      >
                        Ver Detalhes
                      </Button>
                    </Link>
                    <Link href={Campanhas.Home}>
                      <Button
                        borderRadius={staticPosition(25, DISPLAY_BASE)}
                        fontSize={staticPosition(26, DISPLAY_BASE)}
                        bg="sec"
                        color="white"
                        px={staticPosition(30, DISPLAY_BASE)}
                        {...SetStaticPositionH(70, DISPLAY_BASE)}
                      >
                        Apoiar
                      </Button>
                    </Link>
                  </Flex>
                </Box>
              ))}
            </Flex>
          )}
        </Flex>
      </Box>
    </DefaultPage>
  );
}
