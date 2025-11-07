'use client';

import { Button, Center, Checkbox, Input, Link, Text } from "@chakra-ui/react";
import CardCadastro from "./card_cadastro";
import InfoCadastro from "./cadasro_info";
import usePopup from "csa/hooks/usePopup";
import formSchema from "csa/forms_validate/cadastro/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import handleCadastro  from "csa/forms_validate/cadastro/submit";
import { motion } from "framer-motion"; 
import { PasswordInput } from "csa/components/ui/password-input";
import Flex from "csa/components/ui/Flex";
import JustifyFull, { AlignFull } from "csa/utils/JustifyFullCenter";
import { SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/utils/staticPosition";
import Box from "csa/components/ui/Box";

const CardCadastroMotion = motion.create(CardCadastro)
const InfoCadastroMotion = motion.create(InfoCadastro)

export default function Cadastro() {
  const popup = usePopup();
  const {register, handleSubmit, formState: { errors }} = useForm({
    resolver: zodResolver(formSchema)
  });
  
  const onSubmit = async (data: any) => {
    await handleCadastro(data, popup);
  };

  const textFieldConfigs = [
    {
      name: "name",
      label: "name",
      inputProps: {
        as: "input",
        type: "text",
      },
    },
    { name: "username", label: "username", inputProps: { type: "text" } },
    { name: "BornDate", label: "Data de Nascimento", inputProps: { type: "date" } },
    { name: "email", label: "Email", inputProps: { type: "email" } },
  ] as const;

  const passwordFieldConfigs = [
    { name: "password", label: "Senha" },
    { name: "confirmPassword", label: "Confirmar Senha" },
  ] as const;

  const getFieldError = (field: string) => {
    const errorRecord = errors as Record<string, { message?: unknown }>;
    const message = errorRecord[field]?.message;
    if (message == null) return undefined;
    return typeof message === "string" ? message : String(message);
  };

  return (
    <Flex
      dir={"row"}
      gap={staticPosition([0, 2, 3], 1735)}
      {...SetStaticPositionH(1,1)}
      {...SetStaticPositionW(1,1)}
      {...JustifyFull()}
    >
      

      <Box 
        {...SetStaticPositionH(1,1)}
        width={"full"}
      >
        <Center my={staticPosition(25, 1735)}>
          <Text fontSize={staticPosition(48, 1735)} fontWeight="900" textAlign="center">
            Se junte à Causa Solidária!
          </Text>
        </Center>
        <CardCadastroMotion
          initial={{ y: 69, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0, type: "spring" }}
        >

          <Flex
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            dir="column"
            gapY={staticPosition(2, 1735)}
          >
            {textFieldConfigs.map(({ name, label, inputProps }) => {
              const errorMessage = getFieldError(name);
              return (
                <div 
                  key={name}
                  style={{
                    justifyContent:'center',
                    alignItems: "center",
                    fontSize: staticPosition(15, 1735) as string,
                    margin: staticPosition(10, 1735) as string
                  }}
                >
                  <Text>{label}</Text>
                  <Input
                    {...register(name)}
                    borderColor={"ter"}
                    px={staticPosition(12, 1735)}
                    fontSize={staticPosition(15, 1735)}
                    {...SetStaticPositionW(525, 1735)}
                    {...SetStaticPositionH(65, 1735)}
                    {...inputProps}
                  /><br/>
                  {errorMessage && (
                    <span style={{ fontSize: staticPosition(20, 1735) as string, color: "red", position: "absolute" }}>
                      {errorMessage}
                    </span>
                  )}
                </div>
              );
            })}

            {passwordFieldConfigs.map(({ name, label }) => {
              const errorMessage = getFieldError(name);
              return (
                <div 
                  key={name}
                  style={{
                    justifyContent:'center',
                    alignItems: "center",
                    fontSize: staticPosition(15, 1735) as string,
                    margin: staticPosition(10, 1735) as string
                  }}
                >
                  <Text>{label}</Text>
                  <PasswordInput 
                    {...register(name)} 
                    borderColor={"ter"}
                    px={staticPosition(12, 1735)}
                    fontSize={staticPosition(15, 1735)}
                    {...SetStaticPositionW(525, 1735)}
                    {...SetStaticPositionH(65, 1735)} 
                  /><br/>
                  {errorMessage && (
                    <span style={{ fontSize: staticPosition(20, 1745) as string, color: "red", position: "absolute"}}>
                      {errorMessage}
                    </span>
                  )}
                </div>
              );
            })}

            <div style={{margin: ` ${staticPosition(15, 1735) as string} 0` }}>
              <Checkbox.Root >
                <Checkbox.HiddenInput {...register("terms")} />
                <Checkbox.Control 
                  borderColor={"ter"} 
                >
                  <Checkbox.Indicator/>  
                </Checkbox.Control>
                <Checkbox.Label
                  px={staticPosition(25, 1735)}
                  fontSize={staticPosition(15, 1735)}
                >
                  Aceitar <Link textDecor="underline" href="#">termos e condições</Link>
                </Checkbox.Label>
              </Checkbox.Root><br />
              {errors.terms && <span style={
                {
                  fontSize: staticPosition(20, 1745) as string, 
                  color: "red", 
                  position: "absolute"
                  }
                }>{String((errors as any)?.terms?.message || "")}</span>}
            </div>

            <Button 
              type="submit"
              justifySelf={"end"}
              {...SetStaticPositionW(585, 1735)}
              {...SetStaticPositionH(56, 1735)}
              fontSize={staticPosition(24, 1735)}
            >Cadastrar</Button>
          </Flex>
        </CardCadastroMotion>
      </Box>

      <InfoCadastroMotion
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </Flex>
  );
}
