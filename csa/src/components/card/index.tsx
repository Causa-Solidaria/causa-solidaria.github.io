
/*import styled from "styled-components";

interface In_Card {
    background?: string,
    boxShadow?: 
}



const Card = styled.div<{
    
    $config?: In_Card;
    
}>`
    background: ${({ $config }) => $config?.background || "var(--color5)"};
    
    border-radius:  1px;
    box-shadow:  ${({$config}) => $config?.boxShadow || "0 5px 2.5px -2.5px var(--color2)"};
    justify-self: center;
    justify-items: center;
    align-items: center;
    padding: 1.5%;
    width: 65%;
    margin: 25px 0;
    transition: 0.4s ease ;
    
    border: 0.5px solid var(--color2);
    
    @media (max-width: 700px) {
        width: 85%
    }

    div {
        display: flex;

    }

    border-radius: ${props => props.$info ? "8px" : "0"};
    h1 { font-size: ${props => props.$Textsize}; }

    transition: 0.4s ease;
`;

export default Card*/

import styled from "styled-components";
import In_Card from "csa/interfaces/card";


const Card = styled.div<{
    $config?: In_Card;
}>`
    background: ${({ $config }) => $config?.background || "var(--color5)"};
    border-radius: ${({ $config }) => $config?.borderRadius || "1px"};
    box-shadow: ${({ $config }) => $config?.boxShadow || "0 5px 2.5px -2.5px var(--color2)"};
    justify-self: center;
    justify-items: center;
    align-items: center;
    align-self: ${({ $config }) => $config?.alignSelf || "center"};
    justify-content: ${({ $config }) => $config?.justifyContent || "center"};
    padding: ${({ $config }) => $config?.padding || "1.5%"};
    width: ${({ $config }) => $config?.width || "65%"};
    margin: ${({ $config }) => $config?.margin || "25px 0"};
    transition: ${({ $config }) => $config?.transition || "0.4s ease"};
    border: ${({ $config }) => $config?.border || "0.5px solid var(--color2)"};

    @media (max-width: 700px) {
        width: ${({ $config }) => $config?.width || "85%"};
    }

    div {
        display: flex;
    }

    h1 {
        font-size: ${({ $config }) => $config?.textSize || "inherit"};
    }
`;

export default Card;