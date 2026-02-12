import Box from "../ui/Box";
import Footer from "./Footer";
import Header from "./Header";
import Timeline from "./timeline";
import { StaggerProvider } from "../ui/StaggerContext";

import styles from "./Defaultpage.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames";


export default function DefaultPage(
    {
        children,
        hiddenFooter = false,
        hiddenHeader = false,
        className,
        ...props
    }: 
    {
        children?: React.ReactNode,
        hiddenFooter?: boolean,
        hiddenHeader?: boolean
        className?: string
    }
) {
    
    const mergedClassName = MergeClassnames(styles._Body, className)

    return (
        <StaggerProvider>
            <Box className={mergedClassName} >
                {(!hiddenHeader) ? <Header /> : null}
                
                <Timeline {...props} > {children} </Timeline>
                
                {(!hiddenFooter) ? <Footer /> : null}
            </Box>
        </StaggerProvider>
    );
}