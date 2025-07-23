import { Box, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import Conquista from "csa/components/conquista";
import Footer from "csa/components/footer";
import Header from "csa/components/header";
import Timeline from "csa/components/timeline";
import { FaMedal, FaStar, FaTrophy } from "react-icons/fa";



export default function Conquistas() {
    const conquistas = [];

    return (
        <>
        <Header />
        
        <Timeline >
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
        </Timeline>
        
        <Footer />
        </>
        
    );
}