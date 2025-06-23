'use client';

import { Box, Center, Heading, HStack, Image, Link, Stack, Text, VStack } from "@chakra-ui/react";
import Card from "csa/components/card";
import Form from "csa/components/Form"; // Componente reutilizável de formulário
import { ScreenSize } from "csa/utils/getScreenSize";
import { z } from "zod";

// Função que verifica se a pessoa é maior de idade
function isMaiorDeIdade(dataNascimento: string): boolean {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();

    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade >= 18;
}

// Schema de validação com Zod para os campos do formulário
const formSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    username: z.string().min(1, "Nome de usuário é obrigatório"),
    BornDate: z.string().refine((data) => isMaiorDeIdade(data), "Você deve ser maior de idade"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
    terms: z.any().refine((value) => !!value, "Você deve aceitar os termos e condições"),
}).refine((dados) => dados.password === dados.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
});

// Define os campos que vão aparecer no formulário
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
        children: (<Link textDecor="underline" href="#">termos e condições</Link>) 
    },
];

// Função que será chamada ao submeter o formulário
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

    alert("Cadastro realizado com sucesso!");
  } catch (error) {
    alert(`Erro no cadastro: ${error.message}`);
  }
};

function Logozone() {
    const scrSize = ScreenSize();
    return (
         <Box
            w="full"
            gap={2}
            borderRadius={` 0 0 0 ${scrSize.height*0.05}px`}
            justifyItems="center"
            alignItems="center"
            bg="ter"
        >
            <Image src={`/logo.png`} alt="Logo Causa Solidária" borderRadius="15px" width="10%" mt="2.5%" />
            <Text fontSize={`${scrSize.height*0.05}px`} fontWeight="bold" color="qui">Causa Solidária</Text>
        </Box>
    )
}



// Componente principal da página de cadastro
export default function Cadastro() {
    const scrSize = ScreenSize();
    const isMobile = scrSize.width < scrSize.height 
    const cadsSapce = isMobile ? 1 : 0.65; // Porcentagem da tela ocupada pelo formulário

    return (
        <Stack h={`${scrSize.height}px`} direction={isMobile ? "column" : "row"} >
            {/* Coluna do formulário */}
            <Box 
                h={`${scrSize.height}px`} maxW={`${Math.trunc(scrSize.width * cadsSapce)}px`} 
            >
                <Card.Root maxW="600px" w={`${scrSize.height*0.70}px`} mx={`${scrSize.height*0.70}px`} fontSize={`${scrSize.height*0.020}px`} justifySelf={"center"} alignSelf={"center"} mt={`${scrSize.height*0.05}px`} justifyContent="center" alignContent="center" px={4} py={1}>
                    <Card.Header>
                        <Center>
                            <Text fontSize="2xl">Se junte à Causa Solidária!</Text>
                        </Center>
                    </Card.Header>
                    <Card.Body>
                        {/* Formulário com validação e envio */}
                        <Form formArray={formArray} schema={formSchema} set_rota={handleCadastro}>
                            {/* Você pode adicionar botões ou outros elementos aqui, se quiser */}
                        </Form>
                    </Card.Body>
                </Card.Root>
            </Box>

            
            <Box 
                h={`${scrSize.height}px`} 
                w={isMobile ?  `100vw` : `${Math.trunc(scrSize.width * (1-cadsSapce))}px` } 
                bg="sec" 
                position={isMobile ? "static" : "fixed" } 
                bottom={isMobile ? 0 : undefined}
                right={isMobile ? undefined : 0}
                top={isMobile ? undefined : 0}
            >
                <VStack>
                   {isMobile ? undefined : (<Logozone/>)}

                    <Box mx="7.5%" mt="5%">
                        <Heading fontSize={`${scrSize.height*0.075}px`} color="qui" lineHeight="110%" fontWeight={900}>
                            transforme pequenos gestos em grandes mudanças
                        </Heading>
                        <Text fontSize={`${scrSize.height*0.025}px`} color="qui" mt={`${scrSize.height*0.005}px`}>
                            A Causa Solidária é uma plataforma que conecta pessoas dispostas a ajudar causas criadas por outras pessoas.
                        </Text>
                        <Text fontSize={`${scrSize.height*0.025}px`} color="qui" mt={`${scrSize.height*0.005}px`}>
                            Aqui você pode criar sua própria causa, divulgar e receber doações de pessoas que se importam com o seu projeto.
                        </Text>
                        <Text fontSize={`${scrSize.height*0.015}px`} color="qui" mt={`${scrSize.height*0.005}px`} textAlign="center">
                            Junte-se a nós e faça a diferença na vida de quem mais precisa!
                        </Text>
                    </Box>
                </VStack>
            </Box> 
        </Stack>
    );
}
