import { BoxProps, FlexProps } from "@chakra-ui/react";
import Box from "./Box";




export default function Flex({children, dir, ref, ...props}: BoxProps & {ref?: React.Ref<HTMLDivElement>}){
    return <Box display={"flex"} flexDir={dir} {...props} ref={ref} >{children}</Box>
}