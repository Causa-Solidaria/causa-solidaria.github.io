import Box from "../../ui/Box";
import Footer from "./Footer";
import Header from "./Header";
import Timeline from "./timeline";

import styles from "./Defaultpage.module.css"


export default function DefaultPage(
    {
        children,
        hiddenFooter = false,
        hiddenHeader = false,
        ...props
    }: 
    {
        children?: React.ReactNode,
        hiddenFooter?: boolean,
        hiddenHeader?: boolean
    }
) {
    
    return (
        <Box className={styles._Body} >
            {(!hiddenHeader) ? <Header /> : null}
            
            <Timeline {...props} > {children} </Timeline>
            
            {(!hiddenFooter) ? <Footer /> : null}
        </Box>
    );
}