//import "csa/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "csa/theme";
import ProviderPopup from "csa/components/ProviderPopup";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider value={system}>
        <ProviderPopup>
          <AnimatePresence><Component {...pageProps}/></AnimatePresence>
        </ProviderPopup>
      </ChakraProvider>
    </>
  );
}
