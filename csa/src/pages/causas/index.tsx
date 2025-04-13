import CardSpace from "csa/components/cardSpace";
import Header from "csa/components/header";
import Rodape from "csa/components/rodape";
import { useEffect, useState } from "react";


export default function Home() {
  
  return (
    <>
      <Header/>
      <main>
        <CardSpace />
      </main>
      <Rodape/>
    </> 
  );
}