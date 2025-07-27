import { Box, ChakraProviderProps, Image } from "@chakra-ui/react";



export default function Logo(props: any & ChakraProviderProps) {
    return <Image src={`/logo.png`} alt="logo" borderRadius={"15px"} width={props?.width || "20%"} />
}