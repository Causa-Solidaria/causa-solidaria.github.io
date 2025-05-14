"use client"
import Header from "csa/components/header";
import Rodape from "csa/components/rodape";

export default function Home() {
  return (
    <>
      <Header />
      <main style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0rem", color: "var(--color2)" }}>
          Sobre a Causa Solidária
        </h1>
        <section style={{ maxWidth: 700, fontSize: "1.2rem", color: "var(--color3)", textAlign: "center" }}>
          <p>
            Somos a <strong>Causa Solidária</strong>, uma iniciativa dedicada a transformar vidas por meio da solidariedade e do apoio mútuo.
            Nosso objetivo é conectar pessoas dispostas a ajudar com quem mais precisa, promovendo campanhas, arrecadações e ações sociais.
          </p>
          <br />
          <h2 style={{ color: "var(--color2)" }}>Nossa Missão</h2>
          <p>
            Promover a inclusão social, combater a desigualdade e inspirar a empatia em nossa comunidade.
            Acreditamos que pequenas ações podem gerar grandes mudanças.
          </p>
         
          <br />
          <h2 style={{ color: "var(--color2)" }}>Junte-se a nós!</h2>
          <p>
            Seja voluntário, faça uma doação ou compartilhe nossas campanhas. Toda ajuda faz a diferença!
          </p>
        </section>
      </main>
      <Rodape />
    </>
  );
}