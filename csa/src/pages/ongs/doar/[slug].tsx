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
import { LuUpload, LuBuilding2 } from "react-icons/lu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Breadcrumb } from "csa/components/ui";
import { DoarOngData, doarOngSchema } from "csa/lib/validations/ong";
import { handleDoarOng } from "csa/lib/handlers/ong";
import { OngDetail, mockOngsDetail } from "csa/mocks/ongs";
import styles from "../slug.module.css";

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

      <div className={styles.container}>
        <Breadcrumb
          items={[
            { label: "ongs", href: Rotas.ONGs.Home },
            { label: c.nome, href: Rotas.ONGs.slug + slug },
            { label: "doar" },
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
          {c.logoUrl ? (
            <div className={`${styles.cardHeader} ${styles.cardHeaderWithImage}`}>
              <Image
                src={c.logoUrl.startsWith("data:") ? c.logoUrl : `data:image/png;base64,${c.logoUrl}`}
                alt={`Logo ${c.nome}`}
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
            <h1 className={styles.title}>Doar para &ldquo;{c.nome}&rdquo;</h1>

            <form className={styles.doarForm} onSubmit={handleSubmit(onSubmit)}>
              {/* Upload foto */}
              <div className={styles.doarUploadSection}>
                <FileUpload.Root maxFiles={1} onChange={handleThumbnailChange}>
                  <FileUpload.HiddenInput accept="image/jpeg,image/png" />
                  <FileUpload.Trigger asChild>
                    <button type="button" className={styles.doarUploadButton}>
                      <LuUpload /> Enviar foto do item
                    </button>
                  </FileUpload.Trigger>
                </FileUpload.Root>

                {uploadError && <span className={styles.doarError}>{uploadError}</span>}

                {preview ? (
                  <Image
                    className={styles.doarPreviewImage}
                    src={preview}
                    alt="Pré-visualização"
                  />
                ) : (
                  <div className={styles.doarPreviewPlaceholder} />
                )}

                <span className={styles.doarUploadHint}>
                  Tipos: jpg ou png<br />
                  Tamanho mínimo: 300 × 300 px
                </span>
              </div>

              {/* Categoria */}
              <select {...register("category")} className={styles.doarSelect}>
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
                <span className={styles.doarError}>{errors.category.message}</span>
              )}

              {/* Mensagem */}
              <textarea
                {...register("message")}
                className={styles.doarTextarea}
                placeholder="Mensagem opcional para a ONG"
              />
              {errors.message && (
                <span className={styles.doarError}>{errors.message.message}</span>
              )}

              {/* Submit */}
              <div className={styles.buttonRow}>
                <button type="submit" className={styles.primaryButton}>
                  Enviar doação
                </button>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => navigate(Rotas.ONGs.slug + slug)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultPage>
  );
}

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug as string;

  let ong: OngDetail | null = null;

  if (USE_MOCK) {
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
        logoUrl: dbOng.logoUrl ?? "",
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
      rua: ong.rua || "",
      numero: ong.numero || "",
      bairro: ong.bairro || "",
      email: ong.email,
      telefone: ong.telefone || "",
      site: ong.site || "",
      logoUrl: ong.logoUrl || "",
      fundacao: ong.fundacao || "",
      missao: ong.missao || "",
      voluntarios: ong.voluntarios,
      campanhasAtivas: ong.campanhasAtivas,
      notFound: false,
    },
  };
};
