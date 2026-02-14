import { Button, ButtonProps } from "@chakra-ui/react";
import { useRouter } from "next/router";





export default function BackRouteBT({...props}: ButtonProps){
    const router = useRouter()

    return <Button
        bg={"transparent"}
        color={"black"}
        fontSize={76}
        type="button"
        onClick={() => router.back()}
        {...props}
    >
        {"←"}
    </Button>
}