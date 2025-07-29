import { Checkbox } from "@chakra-ui/react";

interface CheckboxFieldProps {
  item: any;
  register: any;
  scrSize: { height: number };
}

// Componente para campo do tipo checkbox
export default function CheckboxField({ item, register, scrSize }: CheckboxFieldProps) {
  return (
    <Checkbox.Root
      variant={"subtle"}
      color={"ter"}
      height={`3em`}
      {...register(item.register)}
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control />
      <Checkbox.Label fontSize={`12pt`}>
        {item.label} {item.children}
      </Checkbox.Label>
    </Checkbox.Root>
  );
}
