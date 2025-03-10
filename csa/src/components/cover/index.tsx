import checkFileExists from "csa/scripts/checaSePastaExite";
import {Cover_st} from "./styles";
import { promises } from "dns";


const Cover = (props: {src? : string}) => {
    var hasImage = checkFileExists(props.src);
    
    console.log(hasImage["promisesResult"]) 
    if (hasImage){
        return (<Cover_st src={props.src}/>)
    }else{
        return (<div style={{"alignItems": "center","justifyContent": "center", "display": "flex", "height": "150px"}}><p>cover sem imagem</p></div>)
    }
}

export default Cover