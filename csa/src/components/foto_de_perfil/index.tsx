import { Avatar } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";




export default function Foto_perfil(){
    return (
        <Tooltip content="Perfil">
            <Avatar.Root>
            <Avatar.Fallback />
            <Avatar.Image />
            </Avatar.Root>
        </Tooltip>
    )
}