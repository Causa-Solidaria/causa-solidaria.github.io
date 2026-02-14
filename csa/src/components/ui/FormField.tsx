import React from "react";
import Box from "csa/components/ui/Box";
import Input, { SelectOption } from "csa/components/ui/input";
import { Text } from "@chakra-ui/react";
import styles from "./ui.module.css";
import { UseFormRegisterReturn } from "react-hook-form";

export interface FormFieldProps {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  error?: string;
  type?: 'text' | 'password' | 'textarea' | 'select';
  options?: SelectOption[];
}

export default function FormField({
  label,
  name,
  register,
  error,
  type = 'text',
  options,
}: FormFieldProps) {
  return (
    <Box dir="column" className={styles.formField}>
      <Text className={styles.formFieldLabel}>
        {label}
      </Text>
      {type === 'textarea' ? (
        <Input
          type="textarea"
          {...register}
          name={name}
          className={styles.formFieldTextarea}
        />
      ) : type === 'select' ? (
        <Input
          type="select"
          {...register}
          name={name}
          options={options || []}
          className={styles.formFieldSelect}
        />
      ) : (
        <Input
          type={type}
          {...register}
          name={name}
          className={styles.formFieldInput}
        />
      )}
      {error && (
        <Text className={styles.formFieldError}>
          {error}
        </Text>
      )}
    </Box>
  );
}
