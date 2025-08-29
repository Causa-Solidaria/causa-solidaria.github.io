import { Input } from "@chakra-ui/react";

interface InputFieldProps {
  item: any;
  register: any;
  scrSize: { height: number };
  props?: any;
}

// Componente para campo de input padrão
export default function InputField({ item, register,  ...props}: InputFieldProps) {
  return (
    <Input
      borderColor={"ter"}
      color={"ter"}
      height={`3em`}
      fontSize={`12pt`}
      placeholder={item.placeholder}
      type={item.type}
      {...register(item.register)}
    />
  );
}
