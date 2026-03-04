import DefaultPage from "csa/components/DefaultPage";
import { GetServerSideProps } from "next";
import { prisma } from "csa/lib/prisma";
import Head from "next/head";
import { useState } from "react";
import Rotas from "csa/Rotas.json";
import useNavigate from "csa/hooks/useNavigate";
import usePopup from "csa/hooks/usePopup";
import { FiArrowLeft } from "react-icons/fi";
import { FileUpload, Image } from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { doarCampanhaSchema, DoarCampanhaData } from "csa/lib/validations/campanha";
import { handleDoarCampanha } from "csa/lib/handlers/campanha";
import { CampanhaDetail, mockCampanhaDetail } from "csa/mocks/campanhas";
import styles from "./doar.module.css";
import { Box, Breadcrumb, Card, Heading, Button, Flex } from "csa/components/ui";

interface DoarProps extends CampanhaDetail {}

function getImageSrc(foto?: string): string {
  if (!foto || foto.length === 0) return "/logo.png";
  if (foto.startsWith("data:") || foto.startsWith("http") || foto.startsWith("/")) {
    return foto;
  }
  return `data:image/*;base64,${foto}`;
}

export default function DoarPage(c: DoarProps) {
  const { navigate } = useNavigate();
  const popup = usePopup();
  const [thumbnailString, setThumbnailString] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<DoarCampanhaData>({
    resolver: zodResolver(doarCampanhaSchema),
  });

  const fotoSrc = getImageSrc(c.foto);

  const handleThumbnailChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isJpgPng = /image\/(jpeg|png)/.test(file.type) || /\.(jpe?g|png)$/i.test(file.name);
    if (!isJpgPng) {
      setUploadError("Apenas arquivos .jpg ou .png");
      setThumbnailString(null);
      setPreview(null);
      return;
    }

    const dimsOk = await new Promise<boolean>((resolve) => {
      const img = new window.Image();
      img.onload = () => resolve(img.width >= 300 && img.height >= 300);
      img.onerror = () => resolve(false);
      img.src = URL.createObjectURL(file);
    });
    if (!dimsOk) {
      setUploadError("Dimensão mínima: 300x300");
      setThumbnailString(null);
      setPreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result?.toString().split(",")[1];
      if (!base64) return;

      setThumbnailString(base64);
      setPreview(URL.createObjectURL(file));
      setUploadError(null);
    };
    reader.readAsDataURL(file);
  };

  function onSubmit(data: DoarCampanhaData) {
    if (!thumbnailString) {
      popup("É necessário enviar uma foto do item a ser doado para que a ONG possa analisar a compatibilidade.");
      return;
    }

    handleDoarCampanha({ ...data, photoString: thumbnailString }, popup);
  }

  return (
    <DefaultPage>
      <Head>
        <title>Doar - {c.titulo}</title>
      </Head>

      <Box className={styles.container}>
        <Breadcrumb
          items={[
            { label: "campanhas", href: Rotas.Campanhas.Home },
            { label: c.titulo, href: Rotas.Campanhas.slug + c.id },
            { label: "doar" },
          ]}
        />

        <button
          className={styles.backButton}
          onClick={() => navigate(Rotas.Campanhas.slug + c.id)}
          aria-label="Voltar"
        >
          <FiArrowLeft />
        </button>

        <Card className={styles.card}>
          <Heading className={styles.pageTitle}>Doar para &ldquo;{c.titulo}&rdquo;</Heading>
          <p className={styles.category}>Categoria da campanha: <strong>{c.nivelAjuda}</strong></p>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.uploadColumn}>
              <FileUpload.Root maxFiles={1} onChange={handleThumbnailChange}>
                <FileUpload.HiddenInput accept="image/jpeg,image/png" />
                <FileUpload.Trigger asChild>
                  <Button className={styles.uploadButton}>
                    <LuUpload /> Enviar foto do item
                  </Button>
                </FileUpload.Trigger>
              </FileUpload.Root>

              {uploadError && <span className={styles.uploadError}>{uploadError}</span>}

              {preview ? (
                <Image
                  className={styles.previewImage}
                  src={preview}
                  alt="Pré-visualização"
                />
              ) : (
                <div className={styles.previewPlaceholder} />
              )}

              <span className={styles.uploadHint}>
                Tipos: jpg ou png<br />
                Tamanho mínimo: 300 × 300 px
              </span>
            </div>

            <textarea
              {...register("message")}
              className={styles.textarea}
              placeholder="Mensagem opcional para o responsável da campanha"
            />
            {errors.message && (
              <span className={styles.errorMessage}>{errors.message.message}</span>
            )}

            <Flex className={styles.submitContainer}>
              <Button type="submit" className={styles.submitButton}>
                Enviar doação
              </Button>
            </Flex>
          </form>
        </Card>
      </Box>
    </DefaultPage>
  );
}

const USE_TEST_DATA = process.env.NEXT_PUBLIC_USE_TEST_DATA === "true";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug as string;

  const campanha = USE_TEST_DATA
    ? mockCampanhaDetail
    : await (async () => {
        const isUuid = /^[0-9a-fA-F-]{36}$/.test(slug);
        return isUuid
          ? await prisma.campanha.findUnique({ where: { id: slug } })
          : (await prisma.campanha.findMany({ where: { titulo: decodeURIComponent(slug) } }))[0];
      })();

  if (!campanha) {
    return { notFound: true } as any;
  }

  return {
    props: {
      id: campanha.id,
      titulo: campanha.titulo,
      descricao: campanha.descricao ?? "",
      nivelAjuda: campanha.nivelAjuda,
      cep: campanha.cep,
      estado: campanha.estado ?? "",
      bairro: campanha.bairro ?? "",
      rua: campanha.rua,
      numero: campanha.numero,
      foto: campanha.foto ? campanha.foto : "",
      createdAt: typeof campanha.createdAt === "string" ? campanha.createdAt : campanha.createdAt.toISOString(),
      endDate: typeof campanha.endDate === "string" ? campanha.endDate : campanha.endDate.toISOString(),
      notFound: false,
    },
  };
};
