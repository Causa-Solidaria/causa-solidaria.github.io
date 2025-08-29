'use client';

import { Box, Button, Flex, Image, Input, Link, Text, useBreakpointValue } from "@chakra-ui/react";
import Form from "csa/components/Form";
import { ScreenSize } from "csa/utils/getScreenSize";
import { z } from "zod";
import CardCadastro from "./card_cadastro";
import InfoCadastro from "./cadasro_info";
import usePopup from "csa/hooks/usePopup";
import { isMobile } from "csa/utils/isMobile";
import { formSchema } from "./FormConfig/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleCadastro } from "./FormConfig/submit";



const formArray = [
  { label: "Nome", register: "name", placeholder: "Digite seu nome", type: "text" },
  { label: "Nome de Usuário", register: "username", placeholder: "Digite seu nome de usuário", type: "text" },
  { label: "Data de nascimento", register: "BornDate", type: "date" },
  { label: "Email", register: "email", placeholder: "Digite seu email", type: "email" },
  { label: "Senha", register: "password", placeholder: "Digite sua senha", type: "password", ispassword: true },
  { label: "Confirmar Senha", register: "confirmPassword", placeholder: "Confirme sua senha", type: "password", ispassword: true },
  {
    label: "Aceitar",
    register: "terms",
    ischeckbox: true,
    type: "checkbox",
    children: <Link textDecor="underline" href="#">termos e condições</Link>,
  },
];

function Logozone() {
  return (
    <Box
      w="full"
      py={6}
      bg="ter"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      borderBottomRadius="15px"
    >
      <Image src="/logo.png" alt="Logo Causa Solidária" borderRadius="full" width="80px" mb={3} />
      <Text fontSize={["xl", "2xl", "3xl"]} fontWeight="bold" color="qui" textAlign="center">
        Causa Solidária
      </Text>
    </Box>
  );
}

export default function Cadastro() {
  const ehMobile = isMobile();
  const popup = usePopup();

  const {register, handleSubmit, formState: { errors }, reset} = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await handleCadastro(data, popup);
    reset();
  };

  return (
    <Flex
      w="full"
      direction={ehMobile ? "column-reverse" : "row"}
      justify="center"
      gap={[0, 4, 10]}
      bg="pri"
    >
      <InfoCadastro />

      <Box w="full" >
        {ehMobile && <Logozone />}
        <CardCadastro align={"center"}>
          
          <Box 
            as="form"  
            onSubmit={handleSubmit(onSubmit)} 
            style={{ width: '100%' }}
            display={"grid"}
            gap={4}
            gridTemplateColumns={"repeat(200px, 1fr)"}
            gridTemplateRows={"repeat(auto-fit, minmax(50px, 1fr))"}
          >
            
            {errors.name && <span>{errors.name.message}</span>}
            <Input 
              as="input" 
              {...register("name")} 
              type="text"
              width={"100%"} 
              placeholder="Nome" 
            />
            
            {errors.username && <span>{errors.username.message}</span>}
            <Input {...register("username")} type="text" placeholder="Nome de Usuário" />

            {errors.BornDate && <span>{errors.BornDate.message}</span>}
            <Input {...register("BornDate")} type="date" />

            {errors.email && <span>{errors.email.message}</span>}
            <Input {...register("email")} type="email" placeholder="Email" />

            {errors.password && <span>{errors.password.message}</span>}
            <Input {...register("password")} type="password" placeholder="Senha" />

            {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
            <Input {...register("confirmPassword")} type="password" placeholder="Confirmar Senha" />

            {errors.terms && <span>{errors.terms.message}</span>}
            <label>
              <Input {...register("terms")} type="checkbox" />
              Aceitar <Link textDecor="underline" href="#">termos e condições</Link>
            </label>

            <Button type="submit">Cadastrar</Button>
          </Box>
        </CardCadastro>
      </Box>
    </Flex>
  );
}
