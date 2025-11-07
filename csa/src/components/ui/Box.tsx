import { Box as B, BoxProps} from "@chakra-ui/react";

export default function Box({children, overflow, ref, ...props}: BoxProps & {ref?: React.Ref<HTMLDivElement>}){
    return <B overflow={overflow || "hidden"} {...props} ref={ref}>{children}</B>
}