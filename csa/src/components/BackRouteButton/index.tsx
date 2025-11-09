import { Button, ButtonProps } from "@chakra-ui/react";
import { staticPosition } from "csa/utils/staticPositions";
import { useRouter } from "next/router";





export default function BackRouteBT({...props}: ButtonProps){
    const router = useRouter()

    return <Button
        bg={"transparent"}
        color={"black"}
        fontSize={staticPosition(76,2438)}
        type="button"
        onClick={() => router.back()}
        {...props}
    >
        {"←"}
    </Button>
}