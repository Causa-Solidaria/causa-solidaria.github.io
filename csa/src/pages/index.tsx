import Image from "next/image"

export default function Home() {
  return (
    <>
      <main>
        <header>
          <h1 >Causa Solidária</h1>
          <p >Junte-se a nós nessa missão de transformar vidas!</p>
        </header>
        <section >
          <p>
            Aqui no <strong>Causa Solidária</strong> buscamos unir pessoas e iniciativas para promover ações de
            solidariedade e impacto social. Explore nossas seções e descubra como você pode contribuir para um mundo
            melhor.
          </p>
          <div>
              <a>
                <h2>Sobre Nós</h2>
                <p>Conheça nossa missão, visão e valores.</p>
              </a>
              <a>
                <h2>Contato</h2>
                <p>Entre em contato e saiba como participar.</p>
              </a>
          </div>
        </section>
      </main>
    </> 
  );
}
