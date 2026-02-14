import { Image, ImageProps } from "@chakra-ui/react";
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames";
import UiStyles from "./ui.module.css"

export default function Logo({ className, ...props }: ImageProps) {
    return (
        <Image 
            className={MergeClassnames(className, UiStyles.logo)}
            src={`/logo.png`} 
            alt="logo"
            {...props}
        />
    )
}