import styled from "styled-components";
import Label from "../label";
import Input from "../input";


interface In_TextBar {
    text?: string;
    $config?: {
        color?: string;
        margin?: string;
    };
    For: string; 
    type?: string;
}

const Label_TB = styled(Label)<{ $config: In_TextBar["$config"]}>`
    margin: ${({$config}) => $config?.margin || "10px 0 0 0" };
`
const Input_TB = styled(Input)`
    
`

const TextBar = ( props: In_TextBar ) => {
    return (<>
        <Label_TB htmlFor={props.For}>
            <p>{props.text || ""}</p>
            <Input_TB type={props.type || "text"} name={props.For} id={props.For}></Input_TB>
        </Label_TB>
        </>
    )
        
}


export default TextBar