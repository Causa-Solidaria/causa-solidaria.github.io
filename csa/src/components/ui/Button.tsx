import { Button as B, ButtonProps } from "@chakra-ui/react"
import React from 'react'

export default function Button(props: ButtonProps){
    return <B {...props}>{props.children}</B>
}
