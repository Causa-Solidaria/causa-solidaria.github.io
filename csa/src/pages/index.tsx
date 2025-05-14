'use client'
import Header from "csa/components/header";
import Rodape from "csa/components/rodape";
import Card from "csa/components/card";
import Buttom from "csa/components/buttom";
import { Grid } from "csa/components/cadastro/styled";

export default function Home() {
  return (
    <>
      <Header />
          <h1 style={{justifySelf: "center", marginTop: "10%"}}>Bem-vindo à Causa Solidária!</h1>
          <Card $config={{ borderRadius: "12px", border: "2px solid var(--color2)"}}>
            <p>
              Junte-se a nós para transformar vidas! Participe de campanhas, seja voluntário ou faça uma doação.
            </p>
            <Grid style={{gap: "30px", justifySelf: "center"}}>
              <Buttom text="Cadastre-se" $config={{ background: "var(--color2)", color: "var(--color3)", borderRadius: "8px", width: "100%", height: "100%", justifySelf: "center" }} href="/cadastro" />
              <Buttom text="ja tenho conta" $config={{ background: "var(--color4)", color: "var(--color3)", borderRadius: "8px", width: "100%", height: "100%", justifySelf: "center"  }} href="/login" />
            </Grid>   
          </Card>
      <Rodape />
    </>
  );
}