import { BoxProps } from "@chakra-ui/react";
import Box from "./Box";
import styles from "./ui.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames";

type FlexCustomProps = Omit<BoxProps, 'dir'> & {
    dir?: string | string[];
    ref?: React.Ref<HTMLDivElement>;
};

export default function Flex(
    {
        children, 
        dir, 
        ref,
        className, 
        ...props
    }: FlexCustomProps
){
    const mergedClassName = MergeClassnames(styles.flex, className)
    return <Box 
        display={"flex"} 
        className={mergedClassName}
        flexDir={dir as any} 
        {...props} 
        ref={ref} 
    >
        {children}
    </Box>
}