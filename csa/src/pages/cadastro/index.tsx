'use client';

import { Button, Center, Checkbox, Link } from "@chakra-ui/react";
import InfoCadastro from "./cadasro_info";
import usePopup from "csa/hooks/usePopup";
import { cadastroSchema } from "csa/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleCadastro } from "csa/lib/handlers";
import JustifyFull, { AlignFull, SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/lib/utils";
import { Box, Flex, Input, Text, Card, Heading } from "csa/components/ui";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const InfoCadastroMotion = motion.create(InfoCadastro)



export default function Cadastro() {
  const [w, sw] = useState<number>(100);
  const popup = usePopup();
  const {register, handleSubmit, formState: { errors }} = useForm({
    resolver: zodResolver(cadastroSchema)
  });
  
  const onSubmit = async (data: any) => {
    await handleCadastro(data, popup);
  };

  const textFieldConfigs = [
    {name: "name", label: "name"},
    { name: "username", label: "username"},
    { name: "BornDate", label: "Data de Nascimento", type: "date"},
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

  useEffect(()=>{
    const _w =setInterval(()=> sw(screen.width), 10)
    return ()=>clearInterval(_w)
  }, [sw])
  return (
    <Flex
      dir={"row"}
      w="full"
      justifyContent={"space-between"}
      
    >
      

      <Center
        flexDir={"column"}
        width={"full"}
       {...JustifyFull("center", true)}
      >
        <Card
          temSombra={false}
          temBorda={true}
          borderColor={"#006E1F"}
          {...JustifyFull()}
        >
          <Heading fontSize={"3vmax"} level={3}> junte-se à Nós!</Heading>
        </Card>

        <Card
          temSombra={false}
          temBorda
          m={"1vmax"}
          p={"2vmax"}
          {...SetStaticPositionW([0, 877, 877, 585])}
        >

          <Flex
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            dir="column"
            gapY={"1vmax"}
          >

            <Box >
              {textFieldConfigs.map(({ name, label, ...props }) => {
                const errorMessage = getFieldError(name);
                return (
                  <div 
                    key={name}
                    style={{
                      justifyContent:'center',
                      alignItems: "center",
                      padding: "0.5vmax"
                    }}
                  >
                    <Text level={1}>{label}</Text>
                    <Input
                      {...register(name)}
                      {...props}
                    /><br/>
                    {errorMessage && (
                      <p style={
                        { fontSize: "1vmax",
                          color: "red", 
                        }}>
                        {errorMessage}
                      </p>
                    )}
                  </div>
                );
              })}
            </Box>

            <div style={{marginBottom: staticPosition(25, 1735)as string}}>
              <Checkbox.Root >
                <Checkbox.HiddenInput {...register("terms")}/>
                <Checkbox.Control 
                  borderColor={"#006E1F"} 
                >
                  <Checkbox.Indicator/>  
                </Checkbox.Control>
                <Checkbox.Label
                  fontSize={"1vmax"}
                  m="0"
                  p={0}
                >
                  Aceitar <Link textDecor="underline" href="#">termos e condições</Link>
                </Checkbox.Label>
              </Checkbox.Root><br />
              {errors.terms && <p style={
                {
                  fontSize: "1vmax" as string, 
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
        </Card>
      </Center>

      {w>900? <InfoCadastroMotion
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />: null}
    </Flex>
  );
}
