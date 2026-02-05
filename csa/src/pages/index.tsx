import { GetServerSideProps } from "next";
import Routes from "../Rotas.json";

/**
 * Redirect server-side para /home
 * Evita flickering e melhora performance/SEO
 */
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: Routes.Home,
      permanent: false,
    },
  };
};

export default function Root() {
  // Esta página nunca será renderizada devido ao redirect
  return null;
}