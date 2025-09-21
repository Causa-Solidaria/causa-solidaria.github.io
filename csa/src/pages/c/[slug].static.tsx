// Static-export fallback for GitHub Pages: prebuilt generic page
import DefaultPage from "csa/components/DefaultPage";
import CardDefault from "csa/components/Card";
import Head from "next/head";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function CampanhaStatic() {
  return (
    <DefaultPage>
      <Head>
        <title>Campanha</title>
      </Head>
      <CardDefault>
        <Heading fontFamily={"quicksand"}>Campanha não disponível no export</Heading>
        <Text mt={2} color="gray.700">
          Esta página depende de dados dinâmicos. No modo estático, gere páginas
          com `getStaticPaths` ou acesse a versão standalone.
        </Text>
        <Box mt={4}>
          <Text fontSize="sm" color="gray.600">Use a build standalone para SSR.</Text>
        </Box>
      </CardDefault>
    </DefaultPage>
  );
}
