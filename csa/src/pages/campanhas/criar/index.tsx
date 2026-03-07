import { FileUpload, Image } from "@chakra-ui/react";
import DefaultPage from "csa/components/DefaultPage";
import usePopup from "csa/hooks/usePopup";
import { useEffect, useState } from "react";
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
  const [retryAfterSeconds, setRetryAfterSeconds] = useState(0);

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
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<z.infer<typeof criarCampanhaSchema>>({
    resolver: zodResolver(criarCampanhaSchema),
    defaultValues: {
      metaTipo: "dinheiro",
    },
  });

  const metaTipo = watch("metaTipo");

  useEffect(() => {
    if (retryAfterSeconds <= 0) return;

    const timer = setInterval(() => {
      setRetryAfterSeconds((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [retryAfterSeconds]);

  async function onSubmit(data: z.infer<typeof criarCampanhaSchema>) {
    if (retryAfterSeconds > 0) {
      popup(`Aguarde ${retryAfterSeconds}s para tentar novamente.`);
      return;
    }

    const result = await handleCriarCampanha(
      { ...data, thumbnailString: thumbnailString ?? undefined },
      popup
    );

    if (!result.ok && result.retryAfterSeconds) {
      setRetryAfterSeconds(result.retryAfterSeconds);
    }
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
        <p className={styles.pageSubtitle}>
          Organize sua arrecadacao com objetivo claro, prazo e local de entrega.
        </p>

        <Card className={styles.card}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formLayout}>
              <aside className={styles.mediaCard}>
                <div className={styles.sectionHeaderRow}>
                  <h3 className={styles.sectionTitle}>Imagem da campanha</h3>
                </div>

                <FileUpload.Root maxFiles={1} onChange={handleThumbnailChange}>
                  <FileUpload.HiddenInput accept="image/jpeg,image/png" />
                  <FileUpload.Trigger asChild>
                    <Button className={styles.uploadButton}>
                      <LuUpload /> Selecionar imagem
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
                  Formatos aceitos: JPG e PNG. Tamanho minimo: 300x300 px.
                </span>
              </aside>

              <section className={styles.fieldsWrap}>
                <div className={styles.sectionCard}>
                  <div className={styles.sectionHeaderRow}>
                    <h3 className={styles.sectionTitle}>Dados principais</h3>
                  </div>

                  <label className={styles.fieldLabel} htmlFor="title">Nome da campanha</label>
                  <input
                    id="title"
                    {...register("title")}
                    className={styles.input}
                    placeholder="Ex.: Inverno sem frio"
                  />
                  {errors.title && <span className={styles.errorMessage}>{errors.title.message}</span>}

                  <label className={styles.fieldLabel} htmlFor="nivelAjuda">Categoria</label>
                  <select
                    id="nivelAjuda"
                    {...register("nivelAjuda")}
                    className={styles.select}
                    defaultValue=""
                  >
                    <option value="" disabled>Selecione</option>
                    <option value="Alimentos">Alimentos</option>
                    <option value="Roupas">Roupas</option>
                    <option value="Higiene">Higiene</option>
                    <option value="Brinquedos">Brinquedos</option>
                    <option value="Outros">Outros</option>
                  </select>
                  {errors.nivelAjuda && <span className={styles.errorMessage}>{errors.nivelAjuda.message}</span>}

                  <label className={styles.fieldLabel} htmlFor="description">Descricao</label>
                  <textarea
                    id="description"
                    {...register("description")}
                    className={styles.textarea}
                    placeholder="Descreva objetivo, publico impactado e como a comunidade pode ajudar."
                  />
                  {errors.description && <span className={styles.errorMessage}>{errors.description.message}</span>}
                </div>

                <div className={styles.sectionCard}>
                  <div className={styles.sectionHeaderRow}>
                    <h3 className={styles.sectionTitle}>Local de apoio</h3>
                  </div>

                  <div className={styles.gridTwo}>
                    <div>
                      <label className={styles.fieldLabel} htmlFor="cep">CEP</label>
                      <input
                        id="cep"
                        {...register("cep")}
                        className={styles.input}
                        placeholder="00000-000"
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, "").replace(/(\d{5})(\d{0,3}).*/, "$1-$2");
                          e.target.value = v;
                        }}
                      />
                      {errors.cep && <span className={styles.errorMessage}>{errors.cep.message}</span>}
                    </div>

                    <div>
                      <label className={styles.fieldLabel} htmlFor="cidade">Cidade</label>
                      <input
                        id="cidade"
                        {...register("cidade")}
                        className={styles.input}
                        placeholder="Cidade"
                      />
                      {errors.cidade && <span className={styles.errorMessage}>{errors.cidade.message}</span>}
                    </div>
                  </div>

                  <div className={styles.gridTwo}>
                    <div>
                      <label className={styles.fieldLabel} htmlFor="rua">Rua</label>
                      <input
                        id="rua"
                        {...register("rua")}
                        className={styles.input}
                        placeholder="Rua"
                      />
                      {errors.rua && <span className={styles.errorMessage}>{errors.rua.message}</span>}
                    </div>

                    <div>
                      <label className={styles.fieldLabel} htmlFor="numero">Numero</label>
                      <input
                        id="numero"
                        {...register("numero")}
                        className={styles.input}
                        placeholder="Numero"
                      />
                      {errors.numero && <span className={styles.errorMessage}>{errors.numero.message}</span>}
                    </div>
                  </div>
                </div>

                <div className={styles.sectionCard}>
                  <div className={styles.sectionHeaderRow}>
                    <h3 className={styles.sectionTitle}>Meta e prazo</h3>
                  </div>

                  <label className={styles.fieldLabel} htmlFor="metaTipo">Tipo de meta</label>
                  <select
                    id="metaTipo"
                    {...register("metaTipo")}
                    className={styles.select}
                    defaultValue="dinheiro"
                  >
                    <option value="dinheiro">Dinheiro</option>
                    <option value="item">Quantidade de item</option>
                  </select>
                  {errors.metaTipo && <span className={styles.errorMessage}>{errors.metaTipo.message}</span>}

                  <div className={styles.gridTwo}>
                    <div>
                      <label className={styles.fieldLabel} htmlFor="meta">
                        {metaTipo === "item" ? "Quantidade alvo" : "Valor da meta (R$)"}
                      </label>
                      <input
                        id="meta"
                        {...register("meta", { valueAsNumber: true })}
                        type="number"
                        min="1"
                        step={metaTipo === "item" ? "1" : "0.01"}
                        className={styles.input}
                        placeholder={metaTipo === "item" ? "Ex.: 200" : "Ex.: 5000"}
                      />
                      {errors.meta && <span className={styles.errorMessage}>{errors.meta.message}</span>}
                    </div>

                    <div>
                      <label className={styles.fieldLabel} htmlFor="endDate">Prazo final</label>
                      <input
                        id="endDate"
                        {...register("endDate")}
                        type="date"
                        className={styles.dateInput}
                      />
                      {errors.endDate && <span className={styles.errorMessage}>{errors.endDate.message}</span>}
                    </div>
                  </div>

                  {metaTipo === "item" && (
                    <>
                      <label className={styles.fieldLabel} htmlFor="metaItem">Item da meta</label>
                      <input
                        id="metaItem"
                        {...register("metaItem")}
                        className={styles.input}
                        placeholder="Ex.: cestas basicas"
                      />
                      {errors.metaItem && <span className={styles.errorMessage}>{errors.metaItem.message}</span>}
                    </>
                  )}
                </div>
              </section>
            </div>

            {/* ==================== Submit ==================== */}
            <Flex className={styles.submitContainer}>
              <Button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting || retryAfterSeconds > 0}
              >
                {retryAfterSeconds > 0
                  ? `Aguarde ${retryAfterSeconds}s`
                  : isSubmitting
                    ? "Publicando..."
                    : "Publicar campanha"}
              </Button>
            </Flex>
            {retryAfterSeconds > 0 && (
              <p className={styles.submitHint}>
                Limite de tentativas atingido. O envio sera liberado em {retryAfterSeconds}s.
              </p>
            )}
          </form>
        </Card>
      </Box>
    </DefaultPage>
  );
}
