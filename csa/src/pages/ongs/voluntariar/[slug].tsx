import DefaultPage from "csa/components/DefaultPage";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Rotas from "csa/Rotas.json";
import useNavigate from "csa/hooks/useNavigate";
import { FiArrowLeft } from "react-icons/fi";
import { OngDetail, mockOngsDetail, mockOngDefault } from "csa/mocks/ongs";
import styles from "../slug.module.css";
import { Box, Breadcrumb, Button, Flex, Heading } from "csa/components/ui";

interface VoluntariarProps extends OngDetail {}

export default function VoluntariarPage(ong: VoluntariarProps) {
  const { navigate } = useNavigate();
  const router = useRouter();
  const slug = (router.query.slug as string) || "";

  const local = [ong.cidade, ong.uf].filter(Boolean).join(" - ");

  return (
    <DefaultPage>
      <Head>
        <title>Voluntariar-se - {ong.nome}</title>
      </Head>

      <Box className={styles.container}>
        <Breadcrumb
          items={[
            { label: "ongs", href: Rotas.ONGs.Home },
            { label: ong.nome, href: Rotas.ONGs.slug + slug },
            { label: "voluntariar" },
          ]}
        />

        <button
          className={styles.backButton}
          onClick={() => navigate(Rotas.ONGs.slug + slug)}
          aria-label="Voltar"
        >
          <FiArrowLeft />
        </button>

        <Box className={styles.card}>
          <Heading className={styles.pageTitle}>Endereço da ONG</Heading>
          {local ? (
            <p className={styles.description}>
              {ong.rua ? `${ong.rua}, ${ong.numero || ""}` : ""}
              {ong.bairro ? `, ${ong.bairro}` : ""}
              <br />
              {local}
            </p>
          ) : (
            <p className={styles.description}>
              A ONG não informou um endereço completo. Entre em contato pelo e-mail: {ong.email}
            </p>
          )}
        </Box>
      </Box>
    </DefaultPage>
  );
}

// reuse server side logic from slug page
const USE_TEST_DATA = process.env.NEXT_PUBLIC_USE_TEST_DATA === "true";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug as string;

  if (USE_TEST_DATA) {
    const ong = mockOngsDetail[slug] ?? null;
    if (!ong) {
      return { props: { notFound: true } as unknown as VoluntariarProps };
    }

    return { props: ong };
  }

  // development fallback: return mock or default without marking notFound
  const ong = mockOngsDetail[slug] ?? mockOngDefault;
  return { props: { ...ong, notFound: false } as VoluntariarProps };
};
