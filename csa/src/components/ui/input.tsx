import { InputProps } from "@chakra-ui/react";
import { PasswordInput, PasswordInputProps } from "./password-input";
import { Input as In} from "@chakra-ui/react";



export default function Input({children, type, ...props}:InputProps & PasswordInputProps){
    return (
        type === "password" ?
            <PasswordInput {...props}>{children}</PasswordInput>
        : 
            <In type={type} {...props}>{children}</In>
    ) 
}