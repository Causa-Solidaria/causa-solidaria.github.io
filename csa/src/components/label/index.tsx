import styled from "styled-components";
import In_label from "csa/interfaces/Label";


const Label = styled.label<{ $config?: In_label }>`
    color: ${({ $config }) => $config?.labelColor || "var(--color3)"};
    transition: ${({ $config }) => $config?.transition || "0.4s ease"};
`;

export default Label