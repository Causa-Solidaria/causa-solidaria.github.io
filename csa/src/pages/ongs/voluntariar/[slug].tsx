import DefaultPage from "csa/components/DefaultPage";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { prisma } from "csa/lib/prisma";
import Rotas from "csa/Rotas.json";
import useNavigate from "csa/hooks/useNavigate";
import usePopup from "csa/hooks/usePopup";
import { FiArrowLeft, FiMapPin, FiMail, FiGlobe } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import { OngDetail, mockOngsDetail } from "csa/mocks/ongs";
import styles from "../slug.module.css";
import { Box, Breadcrumb } from "csa/components/ui";
import { Image } from "@chakra-ui/react";

interface VoluntariarProps extends OngDetail {}

export default function VoluntariarPage(ong: VoluntariarProps) {
  const { navigate } = useNavigate();
  const router = useRouter();
  const popup = usePopup();
  const slug = (router.query.slug as string) || "";

  const local = [ong.cidade, ong.uf].filter(Boolean).join(" - ");

  const addressParts: string[] = [];
  if (ong.rua) addressParts.push(ong.rua + (ong.numero ? `, ${ong.numero}` : ""));
  if (ong.bairro) addressParts.push(ong.bairro);
  const fullAddress = [...addressParts, local].filter(Boolean).join(" - ");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(ong.email);
    popup("E-mail copiado!");
  };

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

        <div className={styles.card}>
          {/* Header */}
          {ong.logoUrl ? (
            <div className={`${styles.cardHeader} ${styles.cardHeaderWithImage}`}>
              <Image
                src={ong.logoUrl.startsWith("data:") ? ong.logoUrl : `data:image/png;base64,${ong.logoUrl}`}
                alt={`Logo ${ong.nome}`}
                className={styles.cardHeaderImage}
              />
            </div>
          ) : (
            <div className={`${styles.cardHeader} ${styles.cardHeaderFallback}`}>
              <div className={styles.cardIcon}>
                <LuBuilding2 className={styles.cardIconInner} />
              </div>
            </div>
          )}

          <div className={styles.content}>
            <h1 className={styles.title}>Voluntariar-se em {ong.nome}</h1>

            {/* Endereço */}
            <div className={styles.missionSection}>
              <span className={styles.missionLabel}>
                <FiMapPin style={{ display: "inline", marginRight: 6 }} />
                Endereço
              </span>
              {fullAddress ? (
                <p className={styles.missionText}>{fullAddress}</p>
              ) : (
                <p className={styles.missionText}>
                  A ONG não informou um endereço completo.
                </p>
              )}
            </div>

            {/* Contato */}
            <div className={styles.contactSection}>
              <div className={styles.contactItem}>
                <FiMail className={styles.infoIcon} />
                <span>{ong.email}</span>
              </div>
              {ong.site && (
                <div className={styles.contactItem}>
                  <FiGlobe className={styles.infoIcon} />
                  <a
                    className={styles.contactLink}
                    href={ong.site}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ong.site.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
            </div>

            <hr className={styles.divider} />

            {/* CTA */}
            <p className={styles.description}>
              Entre em contato com a ONG para combinar sua visita e começar a ajudar!
            </p>

            <div className={styles.buttonRow}>
              <button className={styles.primaryButton} onClick={handleCopyEmail}>
                <FiMail /> Copiar E-mail
              </button>
              <button
                className={styles.secondaryButton}
                onClick={() => navigate(Rotas.ONGs.slug + slug)}
              >
                Voltar ao Perfil
              </button>
            </div>
          </div>
        </div>
      </Box>
    </DefaultPage>
  );
}

// reutiliza lógica de servidor para ONGs (similar à página de detalhes)
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug as string;

  if (USE_MOCK) {
    const ong = mockOngsDetail[slug] ?? null;
    if (!ong) {
      return { notFound: true };
    }
    return { props: ong };
  }

  const isNumber = /^\d+$/.test(slug);
  const dbOng = isNumber
    ? await prisma.ong.findUnique({ where: { id: parseInt(slug, 10) } })
    : await prisma.ong.findFirst({ where: { nome: decodeURIComponent(slug) } });

  if (!dbOng) {
    return { notFound: true };
  }

  // mapeia campos que nos importam (outros ainda não armazenados)
  const props: VoluntariarProps = {
    id: dbOng.id.toString(),
    nome: dbOng.nome,
    descricao: dbOng.descricao,
    area: dbOng.areaAtuacao,
    cidade: dbOng.cidade ?? "",
    uf: dbOng.uf ?? "",
    email: dbOng.contato,
    telefone: "",
    rua: dbOng.rua ?? "",
    numero: dbOng.numero ?? "",
    bairro: dbOng.bairro ?? "",
    site: dbOng.siteOuRede ?? "",
    logoUrl: dbOng.logoUrl ?? "",
    fundacao: "",
    missao: "",
    voluntarios: 0,
    campanhasAtivas: 0,
    notFound: false,
  };

  return { props };
};
