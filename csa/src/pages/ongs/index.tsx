'use client'

import { useEffect, useState, useMemo } from "react";
import { Button, Icon, Text } from "@chakra-ui/react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LuArrowLeft, LuLeaf, LuSearch } from 'react-icons/lu';
import Box from "csa/components/ui/Box";
import Flex from "csa/components/ui/Flex";
import Heading from "csa/components/ui/heading";
import Input from "csa/components/ui/input";
import DefaultPage from "csa/components/DefaultPage";
import { staticPosition, SetStaticPositionW, SetStaticPositionH } from "csa/utils/staticPositions";
import JustifyFull, { AlignFull } from "csa/utils/JustifyFullCenter";
import { ONGs, Campanhas } from "csa/Rotas.json";
import usePopup from "csa/hooks/usePopup";

// Constantes
const DISPLAY_BASE = 2008;

// Types
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
  const popup = usePopup()
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [ongs, setOngs] = useState<Ong[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper functions
  const responsive = (s: number | number[]) => staticPosition(s, DISPLAY_BASE);
  const responsiveW = (w: number | number[]) => SetStaticPositionW(w, DISPLAY_BASE);
  const responsiveH = (h: number | number[]) => SetStaticPositionH(h, DISPLAY_BASE);

  // Fetch ONGs
  useEffect(() => {
    async function fetchOngs() {
      try {
        const res = await fetch('/api/ong_get');
        if (!res.ok) throw popup('Erro ao buscar ONGs');
        
        const data: Ong[] = await res.json();
        const mappedOngs = data.map(ong => ({
          ...ong,
          icon: LuLeaf,
          color: 'green.400'
        }));
        setOngs(mappedOngs);
      } catch (err) {
        console.error('Erro ao carregar ONGs:', err);
        setOngs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOngs();
  }, []);

  // Filtro de busca
  const filteredOngs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return ongs;
    
    return ongs.filter(ong =>
      ong.nome?.toLowerCase().includes(query) || 
      ong.area?.toLowerCase().includes(query) ||
      ong.cidade?.toLowerCase().includes(query)
    );
  }, [searchQuery, ongs]);

  return (
    <DefaultPage
      bg="#02E351"
      {...JustifyFull()}
      {...AlignFull()}
      minH="100vh"
    >
      <Box
        borderRadius={responsive(25)}
        m={{ base: responsive(20), md: responsive(100) }}
        w={{ base: "95%", md: "90%" }}
        maxW={responsive(DISPLAY_BASE * 0.9)}
        minH={responsive(DISPLAY_BASE * 0.4)}
        p={{ base: responsive(20), md: responsive(40) }}
        bg="white"
      >
        {/* Header */}
        <Flex
          dir="row"
          justifyContent="space-between"
          alignItems="center"
          mb={responsive(40)}
          flexWrap="wrap"
          gap={responsive(20)}
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            fontSize={{ base: responsive(20), md: responsive(28) }}
            _hover={{ bg: "gray.100" }}
          >
            <Icon
              as={LuArrowLeft}
              boxSize={{ base: responsive(24), md: responsive(32) }}
            />
          </Button>

          <Heading
            fontSize={{ base: 40, md: 64 }}
            MaxSizeDisplay={DISPLAY_BASE}
            fontWeight={900}
            color="#000"
          >
            ONGs
          </Heading>

          <Link href={ONGs.Criar}>
            <Button
              bg="ter"
              borderRadius={responsive(30)}
              fontSize={{ base: responsive(20), md: responsive(28) }}
              px={{ base: responsive(20), md: responsive(30) }}
              _hover={{ opacity: 0.9 }}
            >
              Cadastrar ONG
            </Button>
          </Link>
        </Flex>

        {/* Busca */}
        <Box
          position="relative"
          mb={responsive(60)}
          border={`${responsive(2)} solid`}
          borderColor="ter"
          borderRadius={responsive(30)}
        >
          <Icon
            as={LuSearch}
            color="ter"
            position="absolute"
            left={responsive(30)}
            top="50%"
            transform="translateY(-50%)"
            boxSize={{ base: responsive(28), md: responsive(40) }}
          />
          <Input
            pl={responsive(90)}
            borderRadius={responsive(30)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar ONG por nome ou área"
            bg="white"
            fontSize={{ base: responsive(20), md: responsive(28) }}
            {...responsiveH(70)}
            borderWidth={0}
          />
        </Box>

        {/* Lista de ONGs */}
        <Flex
          dir="column"
          {...AlignFull()}
          gap={responsive(40)}
        >
          {loading ? (
            <Flex
              {...JustifyFull()}
              {...AlignFull()}
              minH={responsive(300)}
            >
              <Text fontSize={{ base: responsive(24), md: responsive(32) }}>
                Carregando ONGs...
              </Text>
            </Flex>
          ) : filteredOngs.length === 0 ? (
            <Flex
              {...JustifyFull()}
              {...AlignFull()}
              minH={responsive(300)}
            >
              <Text fontSize={{ base: responsive(24), md: responsive(32) }}>
                {searchQuery ? 'Nenhuma ONG encontrada.' : 'Nenhuma ONG cadastrada.'}
              </Text>
            </Flex>
          ) : (
            <Flex
              dir="row"
              flexWrap="wrap"
              gap={responsive(40)}
              justifyContent="center"
            >
              {filteredOngs.map((ong) => (
                <Box
                  key={ong.id}
                  bg="white"
                  p={{ base: responsive(20), md: responsive(40) }}
                  borderRadius={responsive(30)}
                  border={`${responsive(2)} solid #000`}
                  boxShadow={`0 ${responsive(10)} ${responsive(25)} rgba(0,0,0,0.08)`}
                  w={{ base: "100%", sm: "48%", lg: responsive(600) }}
                  minW={{ base: "auto", md: responsive(400) }}
                  _hover={{
                    boxShadow: `0 ${responsive(15)} ${responsive(35)} rgba(0,0,0,0.12)`,
                    transform: "translateY(-2px)",
                    transition: "all 0.2s"
                  }}
                >
                  {/* Header do Card */}
                  <Flex
                    dir="row"
                    alignItems="flex-start"
                    gap={responsive(30)}
                    mb={responsive(20)}
                  >
                    <Box
                      bg={ong.color}
                      color="white"
                      borderRadius="100%"
                      {...responsiveW(80)}
                      {...responsiveH(80)}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <Icon
                        as={ong.icon}
                        boxSize={responsive(48)}
                      />
                    </Box>
                    <Flex
                      dir="column"
                      gap={responsive(10)}
                      alignItems="flex-start"
                      flex={1}
                    >
                      <Text
                        fontWeight="bold"
                        fontSize={{ base: responsive(28), md: responsive(40) }}
                        noOfLines={2}
                      >
                        {ong.nome}
                      </Text>
                      <Text
                        fontSize={{ base: responsive(20), md: responsive(28) }}
                        color="gray.600"
                      >
                        {ong.area}
                      </Text>
                    </Flex>
                  </Flex>

                  {/* Descrição */}
                  <Text
                    fontSize={{ base: responsive(20), md: responsive(28) }}
                    color="gray.800"
                    mb={responsive(20)}
                    noOfLines={3}
                  >
                    {ong.descricao}
                  </Text>

                  {/* Localização */}
                  <Text
                    fontSize={{ base: responsive(18), md: responsive(26) }}
                    color="gray.700"
                    mb={responsive(10)}
                  >
                    {ong.cidade}, {ong.uf}
                  </Text>

                  {/* Email */}
                  <Text
                    fontSize={{ base: responsive(16), md: responsive(24) }}
                    color="gray.600"
                    mb={responsive(30)}
                    noOfLines={1}
                  >
                    {ong.email}
                  </Text>

                  {/* Botões de ação */}
                  <Flex
                    dir="row"
                    gap={responsive(20)}
                    flexWrap="wrap"
                  >
                    <Link href={`/#ong/${ong.id}`}>
                      <Button
                        variant="outline"
                        borderRadius={responsive(25)}
                        fontSize={{ base: responsive(20), md: responsive(26) }}
                        border={`${responsive(2)} solid #000`}
                        bg="white"
                        color="#000"
                        px={{ base: responsive(20), md: responsive(30) }}
                        {...responsiveH(70)}
                        _hover={{ bg: "gray.50" }}
                      >
                        Ver Detalhes
                      </Button>
                    </Link>
                    <Link href={Campanhas.Home}>
                      <Button
                        borderRadius={responsive(25)}
                        fontSize={{ base: responsive(20), md: responsive(26) }}
                        bg="sec"
                        color="white"
                        px={{ base: responsive(20), md: responsive(30) }}
                        {...responsiveH(70)}
                        _hover={{ opacity: 0.9 }}
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