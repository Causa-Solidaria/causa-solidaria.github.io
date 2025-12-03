import React from "react";
import Box from "csa/components/ui/Box";
import Input, { SelectOption } from "csa/components/ui/input";
import { Text } from "@chakra-ui/react";
import { staticPosition, SetStaticPositionH } from "csa/lib/utils";
import { UseFormRegisterReturn } from "react-hook-form";

export interface FormFieldProps {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  error?: string;
  height?: number | string;
  fontSize?: number | string;
  type?: 'text' | 'password' | 'textarea' | 'select';
  options?: SelectOption[];
}

export default function FormField({
  label,
  name,
  register,
  error,
  height = 72,
  fontSize = 26,
  type = 'text',
  options,
}: FormFieldProps) {
  const commonStyles = {
    border: `${staticPosition(2, 2438)} solid` as string,
    borderColor: "#000",
    borderRadius: staticPosition(20, 2438) as string,
    padding: staticPosition(20, 2438) as string,
    fontSize: staticPosition(fontSize as number, 1932) as string,
    background: "#FFF",
  } as const;

  return (
    <Box dir="column">
      <Text fontSize={staticPosition(32, 2438)} fontWeight={600} color="#000" mb={staticPosition(6, 2438)}>
        {label}
      </Text>
      {type === 'textarea' ? (
        <Input
          type="textarea"
          {...register}
          name={name}
          style={{
            ...commonStyles,
            height: staticPosition(height as number, 2438) as string,
          }}
        />
      ) : type === 'select' ? (
        <Input
          type="select"
          {...register}
          name={name}
          options={options || []}
          style={{
            ...commonStyles,
            height: staticPosition(height as number, 2438) as string,
          }}
        />
      ) : (
        <Input
          {...register}
          name={name}
          borderColor="#000"
          border={`${staticPosition(2, 2438)} solid`}
          borderRadius={staticPosition(20, 2438)}
          px={staticPosition(20, 2438)}
          fontSize={staticPosition(fontSize as number, 2438)}
          bg="#FFF"
          {...SetStaticPositionH(height, 2438)}
        />
      )}
      {error && (
        <Text fontSize={staticPosition(20, 2438)} color="red" mt={staticPosition(4, 2438)}>
          {error}
        </Text>
      )}
    </Box>
  );
}
