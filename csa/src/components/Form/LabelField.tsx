import { Field } from "@chakra-ui/react";

interface LabelFieldProps {
  label: string;
  scrSize: { height: number };
}

// Componente para renderizar o label do campo
export default function LabelField({ label, scrSize }: LabelFieldProps) {
  return (
    <Field.Label color="ter" fontSize={`12pt`}>
      {label}
    </Field.Label>
  );
}
