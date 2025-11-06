import { Box, BoxProps } from "@chakra-ui/react";




export default function Flex({children, dir, ...props}: BoxProps){
    return <Box display={"flex"} flexDir={dir} {...props}>{children}</Box>
}