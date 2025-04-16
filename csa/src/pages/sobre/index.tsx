import Header from "csa/components/header";
import Rodape from "csa/components/rodape";

export default function Home() {
  return (
    <>      
      <Header/>
      <main>
        <h1>{"[titulo]"}</h1>
        <p>{"[breve expicação do site]"}</p>
      </main>
      <Rodape/>
    </> 
  );
}