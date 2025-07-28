import { PasswordInput } from "csa/components/ui/password-input";

interface PasswordFieldProps {
  item: any;
  register: any;
  scrSize: { height: number };
}

// Componente para campo de senha customizado
export default function PasswordField({ item, register, scrSize }: PasswordFieldProps) {
  return (
    <PasswordInput
      borderCollapse={"collapse"}
      borderColor={"ter"}
      color={"ter"}
      height={`3em`}
      fontSize={`12pt`}
      placeholder={item.placeholder}
      type={item.type === "password" ? "password" : "text"}
      {...register(item.register)}
    />
  );
}
