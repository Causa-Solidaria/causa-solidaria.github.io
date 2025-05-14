import styled from "styled-components";
import In_Buttom from "csa/interfaces/buttom";
import Link from "next/link";


const Buttom_st = styled.button<{ $config?: In_Buttom }>`
    background: ${({ $config }) => $config?.background || "var(--color2)"};
    background-image: ${({ $config }) => $config?.src || " none "};
    color: ${({ $config }) => $config?.color || "var(--color3)"};
    font-family: ${({ $config }) => $config?.fontFamily || "var(--font)"};
    font-size: ${({ $config }) => $config?.fontSize || "13pt"};
    font-weight: ${({ $config }) => $config?.fontWeight || 900};
    border-radius: ${({ $config }) => $config?.borderRadius || "8px"};
    border: ${({ $config }) => $config?.border || "3px solid"};
    padding: ${({ $config }) => $config?.padding || "0 5%"};
    height: ${({ $config }) => $config?.height || "35px"};
    width: ${({ $config }) => $config?.width || "35px"};
    min-width: ${({ $config }) => $config?.minWidth || "min-content"};
    text-align: ${({ $config }) => $config?.textAlign || "center"};
    justify-content: ${({ $config }) => $config?.justifyContent || "center"};
    justify-self: ${({ $config }) => $config?.justifySelf || "center"};
    align-items: ${({ $config }) => $config?.alignItems || "center"};
    transition: ${({ $config }) => $config?.transition || "0.4s ease"};
    margin: ${({ $config }) => $config?.margin || "0"};
    scale: ${({ $config }) => $config?.scale || "1"};

    &:hover {
        transform: translate(0, -2.5%) scale(1.05);
    }
`;

const Buttom = ( props?: {$config?: In_Buttom, href?: string, text?: string, type?: string, form?: string, value?: string} ) => {
    let link_
    if (props?.href == undefined){
        link_ =  <Buttom_st $config={props?.$config} type={props?.type || "buttom"} form={props?.form || ""} value={props?.value || ""} >{props?.text}</Buttom_st>
    }else{
        link_ = <Link href={props?.href || ""}><Buttom_st $config={props?.$config} type={props?.type || "buttom"} form={props?.form || ""} value={props?.value || ""} >{props?.text}</Buttom_st></Link>
    }
    return link_
}

export default Buttom;