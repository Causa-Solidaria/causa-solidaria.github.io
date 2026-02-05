import { Button as B, ButtonProps } from "@chakra-ui/react"
import React from 'react'

import styles from "./ui.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames"

interface Bprops extends ButtonProps {}


export default function Button({className, ...props}: Bprops){
    const mergedSty = MergeClassnames(className, styles.button)

    return (
    <B
        className={mergedSty}
        {...props}
    >{props.children}</B>)
}
