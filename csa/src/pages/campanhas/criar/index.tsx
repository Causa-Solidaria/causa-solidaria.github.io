import { FileUpload, Image } from "@chakra-ui/react";
import DefaultPage from "csa/components/DefaultPage";
import usePopup from "csa/hooks/usePopup";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import { z } from "zod";
import { handleCriarCampanha } from "csa/lib/handlers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { criarCampanhaSchema } from "csa/lib/validations";
import { Box, Breadcrumb, Card, Heading, Button, Flex } from "csa/components/ui";
import { Campanhas } from "csa/Rotas.json";
import styles from "./criar.module.css";

export default function QueroDoar() {
  const popup = usePopup();

  const [thumbnailString, setThumbnailString] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Lê o arquivo, transforma em Base64 e comprime
  const handleThumbnailChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Apenas JPG ou PNG
    const isJpgPng = /image\/(jpeg|png)/.test(file.type) || /\.(jpe?g|png)$/i.test(file.name);
    if (!isJpgPng) {
      setUploadError("Apenas arquivos .jpg ou .png");
      setThumbnailString(null);
      setPreview(null);
      return;
    }

    // Checar dimensões mínimas 300x300
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

  // Configuração dos campos do formulário
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof criarCampanhaSchema>>({
    resolver: zodResolver(criarCampanhaSchema)
  });

  function onSubmit(data: z.infer<typeof criarCampanhaSchema>) {
    handleCriarCampanha({ ...data, thumbnailString: thumbnailString ?? undefined }, popup);
  }

  return (
    <DefaultPage>
      <Box className={styles.container}>
        <Breadcrumb 
          items={[
            { label: "Campanhas", href: Campanhas.Home },
            { label: "Criar" }
          ]}
        />

        <Heading className={styles.pageTitle}>
          crie sua campanha
        </Heading>

        <Card className={styles.card}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {/* ==================== Duas Colunas ==================== */}
            <div className={styles.columns}>
              {/* ===== Upload ===== */}
              <div className={styles.uploadColumn}>
                <FileUpload.Root maxFiles={1} onChange={handleThumbnailChange}>
                  <FileUpload.HiddenInput accept="image/jpeg,image/png" />
                  <FileUpload.Trigger asChild>
                    <Button className={styles.uploadButton}>
                      <LuUpload /> Upload imagem
                    </Button>
                  </FileUpload.Trigger>
                </FileUpload.Root>

                {uploadError && (
                  <span className={styles.uploadError}>{uploadError}</span>
                )}

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

              {/* ===== Campos ===== */}
              <div className={styles.fieldsColumn}>
                <input
                  {...register("title")}
                  className={styles.input}
                  placeholder="Nome da campanha"
                />
                {errors.title && <span className={styles.errorMessage}>{errors.title.message}</span>}

                <select
                  {...register("nivelAjuda")}
                  className={styles.select}
                  defaultValue=""
                >
                  <option value="" disabled>Escolha a categoria</option>
                  <option value="Alimentos">Alimentos</option>
                  <option value="Roupas">Roupas</option>
                  <option value="Higiene">Higiene</option>
                  <option value="Brinquedos">Brinquedos</option>
                  <option value="Outros">Outros</option>
                </select>
                {errors.nivelAjuda && <span className={styles.errorMessage}>{errors.nivelAjuda.message}</span>}

                <input
                  {...register("cep")}
                  className={styles.input}
                  placeholder="CEP"
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").replace(/(\d{5})(\d{0,3}).*/, "$1-$2");
                    e.target.value = v;
                  }}
                />
                {errors.cep && <span className={styles.errorMessage}>{errors.cep.message}</span>}

                <input
                  {...register("cidade")}
                  className={styles.input}
                  placeholder="Cidade"
                />
                {errors.cidade && <span className={styles.errorMessage}>{errors.cidade.message}</span>}

                <input
                  {...register("rua")}
                  className={styles.input}
                  placeholder="Nome da rua"
                />
                {errors.rua && <span className={styles.errorMessage}>{errors.rua.message}</span>}

                <input
                  {...register("numero")}
                  className={styles.input}
                  placeholder="Número da casa"
                />
                {errors.numero && <span className={styles.errorMessage}>{errors.numero.message}</span>}
              </div>
            </div>

            {/* ==================== Descrição ==================== */}
            <textarea
              {...register("description")}
              className={styles.textarea}
              placeholder="Descrição (mínimo 200 caracteres)"
            />
            {errors.description && <span className={styles.errorMessage}>{errors.description.message}</span>}

            {/* ==================== Data ==================== */}
            <input
              {...register("endDate")}
              type="date"
              className={styles.dateInput}
            />
            {errors.endDate && <span className={styles.errorMessage}>{errors.endDate.message}</span>}

            {/* ==================== Submit ==================== */}
            <Flex className={styles.submitContainer}>
              <Button type="submit" className={styles.submitButton}>
                Criar
              </Button>
            </Flex>
          </form>
        </Card>
      </Box>
    </DefaultPage>
  );
}
