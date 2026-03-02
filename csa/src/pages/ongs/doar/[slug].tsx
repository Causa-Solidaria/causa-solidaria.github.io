import DefaultPage from "csa/components/DefaultPage";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { prisma } from "csa/lib/prisma";
import Rotas from "csa/Rotas.json";
import useNavigate from "csa/hooks/useNavigate";
import usePopup from "csa/hooks/usePopup";
import { FiArrowLeft } from "react-icons/fi";
import { FileUpload, Image } from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Box, Breadcrumb, Card, Heading, Button, Flex } from "csa/components/ui";
import { DoarOngData, doarOngSchema } from "csa/lib/validations/ong";
import { handleDoarOng } from "csa/lib/handlers/ong";
import { OngDetail, mockOngsDetail, mockOngDefault } from "csa/mocks/ongs";
import campaignStyles from "../../campanhas/doar/doar.module.css";

interface DoarProps extends OngDetail {}


export default function DoarOngPage(c: DoarProps) {
  const { navigate } = useNavigate();
  const router = useRouter();
  const slug = (router.query.slug as string) || "";
  const popup = usePopup();
  const [thumbnailString, setThumbnailString] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<DoarOngData>({
    resolver: zodResolver(doarOngSchema),
  });


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

  function onSubmit(data: DoarOngData) {
    if (!thumbnailString) {
      popup("É necessário enviar uma foto do item a ser doado para que a ONG possa analisar a compatibilidade.");
      return;
    }

    handleDoarOng(slug, { ...data, photoString: thumbnailString }, popup);
  }

  return (
    <DefaultPage>
      <Head>
        <title>Doar - {c.nome}</title>
      </Head>

      <Box className={campaignStyles.container}>
        <Breadcrumb
          items={[
            { label: "ongs", href: Rotas.ONGs.Home },
            { label: c.nome, href: Rotas.ONGs.slug + slug },
            { label: "doar" },
          ]}
        />

        <button
          className={campaignStyles.backButton}
          onClick={() => navigate(Rotas.ONGs.slug + slug)}
          aria-label="Voltar"
        >
          <FiArrowLeft />
        </button>

        <Card className={campaignStyles.card}>
          <Heading className={campaignStyles.pageTitle}>Doar para "{c.nome}"</Heading>

          <form className={campaignStyles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={campaignStyles.uploadColumn}>
              <FileUpload.Root maxFiles={1} onChange={handleThumbnailChange}>
                <FileUpload.HiddenInput accept="image/jpeg,image/png" />
                <FileUpload.Trigger asChild>
                  <Button className={campaignStyles.uploadButton}>
                    <LuUpload /> Enviar foto do item
                  </Button>
                </FileUpload.Trigger>
              </FileUpload.Root>

              {uploadError && <span className={campaignStyles.uploadError}>{uploadError}</span>}

              {preview ? (
                <Image
                  className={campaignStyles.previewImage}
                  src={preview}
                  alt="Pré-visualização"
                />
              ) : (
                <div className={campaignStyles.previewPlaceholder} />
              )}

              <span className={campaignStyles.uploadHint}>
                Tipos: jpg ou png<br />
                Tamanho mínimo: 300 × 300 px
              </span>
            </div>

            <select {...register("category")} className={campaignStyles.textarea}>
              <option value="" disabled>
                Selecione a categoria
              </option>
              <option value="Alimentos">Alimentos</option>
              <option value="Roupas">Roupas</option>
              <option value="Brinquedos">Brinquedos</option>
              <option value="Higiene">Higiene</option>
              <option value="Outros">Outros</option>
            </select>
            {errors.category && (
              <span className={campaignStyles.errorMessage}>{errors.category.message}</span>
            )}

            <textarea
              {...register("message")}
              className={campaignStyles.textarea}
              placeholder="Mensagem opcional para a ONG"
            />
            {errors.message && (
              <span className={campaignStyles.errorMessage}>{errors.message.message}</span>
            )}

            <Flex className={campaignStyles.submitContainer}>
              <Button type="submit" className={campaignStyles.submitButton}>
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

  let ong: OngDetail | null = null;

  if (USE_TEST_DATA) {
    ong = mockOngsDetail[slug] ?? null;
  } else {
    const isNumber = /^\d+$/.test(slug);
    const dbOng = isNumber
      ? await prisma.ong.findUnique({ where: { id: parseInt(slug, 10) } })
      : await prisma.ong.findFirst({ where: { nome: decodeURIComponent(slug) } });

    if (dbOng) {
      ong = {
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
        fundacao: "",
        missao: "",
        voluntarios: 0,
        campanhasAtivas: 0,
        notFound: false,
      };
    }
  }

  if (!ong) {
    // retorna 404 quando nada foi encontrado
    return { notFound: true } as any;
  }

  return {
    props: {
      id: ong.id,
      nome: ong.nome,
      descricao: ong.descricao || "",
      area: ong.area,
      cidade: ong.cidade,
      uf: ong.uf,
      email: ong.email,
      telefone: ong.telefone || "",
      site: ong.site || "",
      fundacao: ong.fundacao || "",
      missao: ong.missao || "",
      voluntarios: ong.voluntarios,
      campanhasAtivas: ong.campanhasAtivas,
      notFound: false,
    },
  };
};
