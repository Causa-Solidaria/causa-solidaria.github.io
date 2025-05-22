import styled from "styled-components";
import In_Form from "csa/interfaces/Forms";

const Form = styled.form<{ $config?: In_Form }>`
    margin: ${({ $config }) => $config?.margin || "2% 5%"};
    padding: ${({ $config }) => $config?.padding || "0 5%"};
    font-weight: ${({ $config }) => $config?.fontWeight || 900};
    color: ${({ $config }) => $config?.color || "var(--color2)"};
    transition: ${({ $config }) => $config?.transition || "0.4s ease"};

    
`;
export default Form;