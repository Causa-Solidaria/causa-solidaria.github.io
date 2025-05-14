import styled from "styled-components";

interface In_Title{
    margin?: string;
}

const Title = styled.h1<{$config: In_Title}>`
    margin: ${({$config})=> $config?.margin || "0px"};
    font-family: var(--font);
`

export default Title