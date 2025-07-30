import { ChakraProviderProps } from "@chakra-ui/react";
import { createContext } from "react";

export type popupType = {
    id?: number;
    mensagem: string;
}

type popupContextType = {
    AlertPopup: (mensagem: string)=>void;
}

export interface PopupProps {
    children?: React.ReactNode;
    propsXML?: ChakraProviderProps;   
}


export const PopupContext = createContext< popupContextType >(undefined);
