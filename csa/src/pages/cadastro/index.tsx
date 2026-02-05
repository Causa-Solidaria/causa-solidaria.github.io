'use client';

import { Button, Checkbox, Link, Text as ChakraText } from "@chakra-ui/react";
import usePopup from "csa/hooks/usePopup";
import { cadastroSchema } from "csa/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleCadastro } from "csa/lib/handlers";
import { Box, Flex, Input, Text, Card, Heading } from "csa/components/ui";
import Logo from "csa/components/ui/logo";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./cadastro.module.css";

function InfoCadastro() {
  return (
    <div className={styles.infoSection}>
      <Logo className={styles.infoLogo} />
      
      <div className={styles.infoBrandCard}>
        <Heading className={styles.infoBrandTitle}>CausaSolidaria</Heading>
      </div>

      <div className={styles.infoContentCard}>
        <Heading className={styles.infoHeading}>
          transforme pequenos gestos em grandes mudanças
        </Heading>
        <ChakraText className={styles.infoText}>
          A Causa Solidária é uma plataforma que conecta pessoas dispostas a ajudar causas criadas por outras pessoas.
        </ChakraText>
        <ChakraText className={styles.infoText}>
          Aqui você pode criar sua própria causa, divulgar e receber doações de pessoas que se importam com o seu projeto.
        </ChakraText>
      </div>

      <div className={styles.infoFooterCard}>
        <ChakraText className={styles.infoFooterText}>
          Junte-se a nós e faça a diferença na vida de quem mais precisa!
        </ChakraText>
      </div>
    </div>
  );
}

const InfoCadastroMotion = motion.create(InfoCadastro);

export default function Cadastro() {
  const [w, sw] = useState<number>(100);
  const popup = usePopup();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(cadastroSchema)
  });

  const onSubmit = async (data: any) => {
    await handleCadastro(data, popup);
  };

  const textFieldConfigs = [
    { name: "name", label: "Nome" },
    { name: "username", label: "Usuário" },
    { name: "BornDate", label: "Data de Nascimento", type: "date" },
    { name: "email", label: "Email" },
    { name: "password", type: "password", label: "Senha" },
    { name: "confirmPassword", type: "password", label: "Confirmar Senha" },
  ] as const;

  const getFieldError = (field: string) => {
    const errorRecord = errors as Record<string, { message?: unknown }>;
    const message = errorRecord[field]?.message;
    if (message == null) return undefined;
    return typeof message === "string" ? message : String(message);
  };

  useEffect(() => {
    const _w = setInterval(() => sw(screen.width), 10);
    return () => clearInterval(_w);
  }, [sw]);

  return (
    <div className={styles.page}>
      <div className={styles.formSection}>
        <Card temSombra={false} temBorda={true} className={styles.headerCard}>
          <Heading level={3} className={styles.headerTitle}>Junte-se à Nós!</Heading>
        </Card>

        <Card temSombra={false} temBorda className={styles.formCard}>
          <Flex as="form" onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Box>
              {textFieldConfigs.map(({ name, label, ...props }) => {
                const errorMessage = getFieldError(name);
                return (
                  <div key={name} className={styles.fieldContainer}>
                    <Text level={1} className={styles.fieldLabel}>{label}</Text>
                    <Input {...register(name)} {...props} />
                    {errorMessage && (
                      <p className={styles.errorMessage}>{errorMessage}</p>
                    )}
                  </div>
                );
              })}
            </Box>

            <div className={styles.checkboxContainer}>
              <Checkbox.Root>
                <Checkbox.HiddenInput {...register("terms")} />
                <Checkbox.Control className={styles.checkboxControl}>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Label className={styles.checkboxLabel}>
                  Aceitar <Link textDecor="underline" href="#">termos e condições</Link>
                </Checkbox.Label>
              </Checkbox.Root>
              {errors.terms && (
                <p className={styles.errorMessage}>
                  {String((errors as any)?.terms?.message || "")}
                </p>
              )}
            </div>

            <Button type="submit" className={styles.submitButton}>
              Cadastrar
            </Button>
          </Flex>
        </Card>
      </div>

      {w > 900 && (
        <InfoCadastroMotion
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}
