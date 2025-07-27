'use client'

import { Box,Button, Heading,Input,Text,VStack,} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function NovaSenhaPage() {
  const router = useRouter();
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const urlToken = router.query.token;
    if (typeof urlToken === "string") {
      setToken(urlToken);
    }
  }, [router.query.token]);

  const handleSubmit = async () => {
    if (novaSenha !== confirmacaoSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/nova_senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, newPassword: novaSenha })
      });

      const data = await response.json();
      alert(data.message);

      if (response.ok) {
        router.push("/login");
      }

    } catch (error) {
      console.error("Erro ao redefinir a senha:", error);
      alert("Erro ao redefinir a senha.");
    }

    setIsLoading(false);
  };

  return (
    <Box 
      minH="100vh"
      bg="#e0f7e0"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <Box 
        bg="white"
        p={10}
        borderRadius="lg"
        boxShadow="xl"
        w="100%"
        maxW="400px"
        zIndex={2}
        position="relative"
      >
        <Heading mb={4} fontFamily="monospace" textAlign="center" color="#004d00">
          Criar nova senha
        </Heading>
        <Text mb={6} color="gray.700" fontWeight="medium" textAlign="center" fontSize="sm">
          Insira sua nova senha e confirme abaixo.
        </Text>

        <VStack spacing={6}>
          <Input
            placeholder="Nova Senha"
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            borderColor="green.500"
            _focus={{ borderColor: "green.700" }}
            textAlign="center"
            borderRadius="md"
          />
          <Input
            placeholder="Confirmar Senha"
            type="password"
            value={confirmacaoSenha}
            onChange={(e) => setConfirmacaoSenha(e.target.value)}
            borderColor="green.500"
            _focus={{ borderColor: "green.700" }}
            textAlign="center"
            borderRadius="md"
          />
          <Button 
            colorScheme="green"
            width="100"
            onClick={handleSubmit}
            textTransform="uppercase"
            borderRadius="md"
            isLoading={isLoading}
            loadingText="Enviando..."
            bg="sec"
            color="white"
            _hover={{ bg: "#38d39f" }}
          >
            Redefinir Senha
          </Button>
        </VStack>
      </Box>
      
      <Box 
        width="full"
        height="50vh"
        bg="sec"
        position="absolute"
        bottom={0}
        zIndex={1}
      />
    </Box>
  );
}
