import { Box, ChakraProviderProps } from "@chakra-ui/react";


export default function Timeline({children, ...props}: any & ChakraProviderProps) {

    return (
        <Box 
            minW={"100vmax"}
            minH={"75vmax"}
            p={4}
            bg={"pri"}
            overflowX={"hidden"}
            {...props}
        >
            {children}
        </Box>
    );
}