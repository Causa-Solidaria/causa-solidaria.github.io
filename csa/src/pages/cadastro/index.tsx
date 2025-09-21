'use client';

import { Box, Button, Checkbox, Flex, Image, Input, Link, Text } from "@chakra-ui/react";
import { z } from "zod";
import CardCadastro from "./card_cadastro";
import InfoCadastro from "./cadasro_info";
import usePopup from "csa/hooks/usePopup";
import { isMobile } from "csa/utils/isMobile";
import formSchema from "csa/features/cadastro/FormConfig/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import handleCadastro  from "csa/features/cadastro/FormConfig/submit";
import {motion} from "framer-motion"; 

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


const CardCadastroMotion = motion(CardCadastro)
const InfoCadastroMotion = motion(InfoCadastro)

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
      minH="100vh"
      direction={ehMobile ? "column-reverse" : "row"}
      justify="center"
      gap={[0, 2, 3]}
      bg="pri"
    >
      {!ehMobile && <InfoCadastroMotion
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />}

      <Box w="full" >
        <CardCadastroMotion
          initial={{ y: 69, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0, type: "spring" }}
        >

          <Box
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: '100%' }}
            display="flex"
            flexDirection="column"
            gapY={2}
          >
            <div>
              <Text>name</Text>
              <Input 
                as="input" 
                {...register("name")} 
                type="text"
                width={"100%"}
                borderColor={"ter"} 
              />
              {errors.name && <span style={{fontSize: "12px", color: "red"}}>{errors.name.message}</span>}
            </div>

            <div>
              <Text>username</Text>
              <Input {...register("username")} type="text" borderColor={"ter"} />
              {errors.username && <span style={{fontSize: "12px", color: "red"}}>{errors.username.message}</span>}
            </div>

            <div>
              <Text>Data de Nascimento</Text>
              <Input {...register("BornDate")} type="date" borderColor={"ter"} />
            {errors.BornDate && <span style={{fontSize: "12px", color: "red"}}>{errors.BornDate.message}</span>}
            </div>

            <div>
              <Text>Email</Text>
              <Input {...register("email")} type="email" borderColor={"ter"} />
              {errors.email && <span style={{fontSize: "12px", color: "red"}}>{errors.email.message}</span>}
            </div>

            <div>
              <Text>Senha</Text>
              <Input {...register("password")} type="password" borderColor={"ter"} />
              {errors.password && <span style={{fontSize: "12px", color: "red"}}>{errors.password.message}</span>}
            </div>

            <div>
              <Text>Confirmar Senha</Text>
              <Input {...register("confirmPassword")} type="password" borderColor={"ter"} />
              {errors.confirmPassword && <span style={{fontSize: "12px", color: "red"}}>{errors.confirmPassword.message}</span>}
            </div>

            <div>
              <Checkbox.Root {...register("terms")} my={5}>
                <Checkbox.HiddenInput />
                <Checkbox.Control borderColor={"ter"} >
                  <Checkbox.Indicator/>  
                </Checkbox.Control>
                <Checkbox.Label>
                  Aceitar <Link textDecor="underline" href="#">termos e condições</Link>
                </Checkbox.Label>
              </Checkbox.Root><br />
              {errors.terms && <span style={{fontSize: "12px", color: "red"}}>{errors.terms.message}</span>}
            </div>

            <Button type="submit">Cadastrar</Button>
          </Box>
        </CardCadastroMotion>
      </Box>
    </Flex>
  );
}
