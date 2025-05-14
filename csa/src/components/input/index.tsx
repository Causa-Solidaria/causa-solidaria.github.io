import styled from "styled-components";
import In_input from "csa/interfaces/input";

const Input = styled.input<{ $config?: In_input }>`
    width: ${({ $config }) => $config?.inputWidth || "100%"};
    height: ${({ $config }) => $config?.inputHeight || "30px"};
    background-color: ${({ $config }) => $config?.inputBackground || "#fff"};
    border: ${({ $config }) => $config?.inputBorder || "2px solid var(--color2)"};
    border-radius: ${({ $config }) => $config?.inputBorderRadius || "8px"};
    transition: ${({ $config }) => $config?.transition || "0.4s ease"};
`;

export default Input