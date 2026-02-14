import { Box, BoxProps } from "@chakra-ui/react";
import dpStyles from "./Defaultpage.module.css";

interface TimelineProps extends BoxProps {
    children?: React.ReactNode;
}

export default function Timeline({ children, ...props }: TimelineProps) {

    return (
        <Box 
            className={dpStyles.timeline}
            {...props}
        >
            {children}
        </Box>
    );
}