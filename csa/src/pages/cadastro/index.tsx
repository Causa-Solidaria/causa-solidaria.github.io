'use client';

import { Box, Flex, Image, Link, Text, useBreakpointValue } from "@chakra-ui/react";
import Form from "csa/components/Form";
import { ScreenSize } from "csa/utils/getScreenSize";
import { z } from "zod";
import CardCadastro from "./card_cadastro";
import InfoCadastro from "./cadasro_info";
import usePopup from "csa/hooks/usePopup";
import { isMobile } from "csa/utils/isMobile";

function isMaiorDeIdade(dataNascimento: string): boolean {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;
  return idade >= 18;
}

const formSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    username: z.string().min(1, "Nome de usuário é obrigatório"),
    BornDate: z.string().refine((data) => isMaiorDeIdade(data), "Você deve ser maior de idade"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
    terms: z.any().refine((value) => !!value, "Você deve aceitar os termos e condições"),
  })
  .refine((dados) => dados.password === dados.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });

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
  const scrSize = ScreenSize();
  const ehMobile = isMobile(scrSize.width, scrSize.height);
  const popup = usePopup();

  const handleCadastro = async (data: object) => {
    try {
      const res = await fetch('/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Erro desconhecido");
      }

      popup("Cadastro realizado com sucesso!");
    } catch (error) {
      popup(`Erro no cadastro: ${error.message}`);
    }
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

      <Flex direction="column" w="full" >
        {ehMobile && <Logozone />}
        <CardCadastro align={"center"}>
          <Form formArray={formArray} schema={formSchema} set_rota={handleCadastro}>
            {/* Botões adicionais, se quiser */}
          </Form>
        </CardCadastro>
      </Flex>
    </Flex>
  );
}
