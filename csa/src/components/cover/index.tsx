import { fstat } from "fs";
import {Cover_st} from "./styles";


const Cover = (props: {src? : any}) => {
    var hasImage = false;
    
    fetch(props.src).then(
        response => {
            console.log(response)
            hasImage = !response.ok  
        }
    )
     
    console.log(hasImage) 
    if (hasImage){
        return (<Cover_st src={props.src}/>)
    }else{
        return (<div style={{"alignItems": "center","justifyContent": "center", "display": "flex", "height": "150px"}}><p>cover sem imagem</p></div>)
    }
}

export default Cover