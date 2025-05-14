import styled from "styled-components";
import Label from "../label";
import Input from "../input";


interface In_checkbox {
    text?: string;
    $config?: {
        color?: string;
        margin?: string;
    };
    For: string; 
}

const Label_CB = styled(Label)<{ $config: In_checkbox["$config"]}>`
    margin: ${({$config}) => $config?.margin || "10px 0 0 0" };
    display: flex;
    p, h1 {
        align-self: center;
        justify-self: center;
    }
`
const Input_CB = styled(Input)`
    width: 20px;
    justify-self: start;
    align-self: self-start;
`

const Checkbox = ( props: In_checkbox ) => {
    return (<>
        <Label_CB htmlFor={props.For}>
            <Input_CB type="checkbox" name={props.For} id={props.For}></Input_CB>
            <p>{props.text || ""}</p>
        </Label_CB>
        </>
    )
        
}


export default Checkbox