import { Box, Text, VStack } from "@chakra-ui/react";


export default function Conquista({ titulo, descricao, icone }) {
    return (
        <Box
            bg="white"
            boxShadow="md"
            borderRadius="xl"
            p={6}
            textAlign="center"
            _hover={{ boxShadow: "xl", transform: "scale(1.03)" }}
            transition="all 0.2s"
        >
            <VStack spacing={4}>
                {icone}
                <Text fontWeight="bold" fontSize="lg">
                    {titulo}
                </Text>
                <Text color="gray.600">{descricao}</Text>
            </VStack>
        </Box>
    );
}
