import styled from "styled-components";

interface In_image{
    src?: string;
    borderRadius?: string;
    scale?: string;
    x?: number;
    y?: number;
}

const Image = styled.img<{$config?: In_image}>`
    border-radius: ${({$config})=> $config?.borderRadius || "var(--border-radius)"};
    scale: ${({$config})=> $config?.scale || "var(--border-radius)"};
    transform: translate( ${({$config})=> ($config?.x || 0)+"px" }, ${({$config})=> ($config?.y || 0)+"px" } );
`

export default Image;