import {Heading, SimpleGrid} from "@chakra-ui/react";
import Conquista from "csa/components/conquista";
import DefaultPage from "csa/components/DefaultPage";

export default function Conquistas() {
    const conquistas = [];

    return (
        <DefaultPage>
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
        </DefaultPage>
    );
}