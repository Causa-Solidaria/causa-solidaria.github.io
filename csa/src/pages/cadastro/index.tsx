'use client';

import { Button, Center, Checkbox, Link, Text } from "@chakra-ui/react";
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
import Input from "csa/components/ui/input";

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
    {name: "name", label: "name"},
    { name: "username", label: "username"},
    { name: "BornDate", label: "Data de Nascimento"},
    { name: "email", label: "Email", },
    { name: "password", type: "password", label: "Senha" },
    { name: "confirmPassword", type: "password", label: "Confirmar Senha" },
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
      {...SetStaticPositionW(1,1)}
      {...JustifyFull()}
    >
      

      <Box 
        width={"full"}
      >
        <Center 
          my={staticPosition(25, 1735)} 
          bg={"#fff"}
          px={staticPosition(40, 1735)} 
          py={staticPosition(2, 1735)} 
          borderRadius={staticPosition(20, 1735)}
          borderColor={"#006E1F"}
          border={`${staticPosition(2, 1735)} solid`}
          boxShadow={`0 ${staticPosition(5, 1735)} ${staticPosition(5, 1735)} #006E1F`}
          {...JustifyFull()}
        >
          <Text fontSize={staticPosition(48, 1735)} fontWeight="900" color={"#006E1F"} textAlign="center">
            junte-se à Nós!
          </Text>
        </Center>
        <CardCadastroMotion
          initial={{ y: 69, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0, type: "spring" }}
          my={staticPosition(40, 1735)}
        >

          <Flex
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            dir="column"
            gapY={staticPosition(2, 1735)}
          >

            <Box {...SetStaticPositionW(585*0.8, 1735)}>
              {textFieldConfigs.map(({ name, label, ...props }) => {
                const errorMessage = getFieldError(name);
                return (
                  <div 
                    key={name}
                    style={{
                      justifyContent:'center',
                      alignItems: "center",
                      fontSize: staticPosition(24, 1735) as string,
                      margin: staticPosition(10, 1735) as string
                    }}
                  >
                    <Text color={"006E1F"}>{label}</Text>
                    <Input
                      {...register(name)}
                      borderColor={"#006E1F"}
                      border={`${staticPosition(2, 1735)} solid`}
                      borderRadius={staticPosition(20,1735)}
                      px={staticPosition(12, 1735)}
                      fontSize={staticPosition(15, 1735)}
                      {...SetStaticPositionH(65, 1735)}
                      {...props}
                    /><br/>
                    {errorMessage && (
                      <p style={{ fontSize: staticPosition(12, 1735) as string, color: "red"}}>
                        {errorMessage}
                      </p>
                    )}
                  </div>
                );
              })}
            </Box>

            <div style={{marginBottom: staticPosition(25, 1735)as string}}>
              <Checkbox.Root px={staticPosition(25, 1735)} mt={staticPosition(25, 1735)}>
                <Checkbox.HiddenInput {...register("terms")}/>
                <Checkbox.Control 
                  borderColor={"#006E1F"} 
                  m="0"
                  p="0"
                  {...SetStaticPositionW(20,1735)}
                  {...SetStaticPositionH(20,1735)}
                >
                  <Checkbox.Indicator/>  
                </Checkbox.Control>
                <Checkbox.Label
                  fontSize={staticPosition(24, 1735)}
                  m="0"
                  p={0}
                >
                  Aceitar <Link textDecor="underline" href="#">termos e condições</Link>
                </Checkbox.Label>
              </Checkbox.Root><br />
              {errors.terms && <p style={
                {
                  fontSize: staticPosition(12, 1745) as string, 
                  color: "red", 
                }
                }>{String((errors as any)?.terms?.message || "")}</p>}
            </div>

            <Button 
              type="submit"
              {...JustifyFull()}
              {...AlignFull()}
              {...SetStaticPositionW(585*0.3, 1735)}
              {...SetStaticPositionH(56, 1735)}
              fontSize={staticPosition(24, 1735)}
              borderRadius={staticPosition(12, 1735)}
              bg={"#15B100"}
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
