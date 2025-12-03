import { BoxProps } from "@chakra-ui/react";
import Box from "./Box";

type FlexCustomProps = Omit<BoxProps, 'dir'> & {
    dir?: string | string[];
    ref?: React.Ref<HTMLDivElement>;
};

export default function Flex({children, dir, ref, ...props}: FlexCustomProps){
    return <Box display={"flex"} flexDir={dir as any} {...props} ref={ref} >{children}</Box>
}