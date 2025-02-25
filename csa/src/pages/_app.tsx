import "csa/styles/globals.css";
import type { AppProps } from "next/app";
import Rodape from "csa/components/rodape";
import Header from "csa/components/header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header/>
      <Component {...pageProps} />
      <Rodape/>
    </>
  );
}
