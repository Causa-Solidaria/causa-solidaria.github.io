import { Box, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import Conquista from "csa/components/conquista";
import Footer from "csa/components/footer";
import Header from "csa/components/header";
import { FaMedal, FaStar, FaTrophy } from "react-icons/fa";



export default function Conquistas() {
    const conquistas = [
        {
            titulo: "Primeira Campanha",
            descricao: "Você criou sua primeira campanha!",
            icone: <FaTrophy size={32} color="#FFD700" />,
        },
        {
            titulo: "Meta Atingida",
            descricao: "Uma campanha atingiu a meta de arrecadação.",
            icone: <FaStar size={32} color="#FFB300" />,
        },
        {
            titulo: "Voluntário Ativo",
            descricao: "Participou de 5 campanhas como voluntário.",
            icone: <FaMedal size={32} color="#C0C0C0" />,
        },
    ];

    return (
        <>
        <Header />
        <Box maxW="900px" mx="auto" py={10} px={4}>
            <Heading as="h1" size="xl" mb={8} textAlign="center">
                Minhas Conquistas
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                {conquistas.map((c, idx) => (
                    <Conquista
                        key={idx}
                        titulo={c.titulo}
                        descricao={c.descricao}
                        icone={c.icone}
                    />
                ))}
            </SimpleGrid>
        </Box>
        <Footer />
        </>
        
    );
}