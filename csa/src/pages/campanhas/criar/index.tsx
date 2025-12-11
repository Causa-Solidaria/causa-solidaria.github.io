import { Button, FileUpload, Image, Input, Text, HStack, VStack, NativeSelect, Textarea } from "@chakra-ui/react";
import DefaultPage from "csa/components/DefaultPage";
import usePopup from "csa/hooks/usePopup";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import { z } from "zod";
import { handleCriarCampanha } from "csa/lib/handlers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { criarCampanhaSchema } from "csa/lib/validations";
import { BorderRadiusStatic, SetStaticPositionH, SetStaticPositionW, shadowStatic, staticPosition } from "csa/lib/utils";
import { Box, Breadcrumb, Card } from "csa/components/ui";
import { Campanhas } from "csa/Rotas.json";

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

      const compressed = base64;
      setThumbnailString(compressed);
      setPreview(URL.createObjectURL(file));
      setUploadError(null);
    };
    reader.readAsDataURL(file);
  };

  
  // Configuração dos campos do formulário
  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof criarCampanhaSchema>>({
    resolver: zodResolver(criarCampanhaSchema)
  });

  function onSubmit(data: z.infer<typeof criarCampanhaSchema>) {
    handleCriarCampanha({ ...data, thumbnailString: thumbnailString ?? undefined }, popup);
  }


      ///esses são os helpers
      const MaxSize = 2440
      const st = (s: number | string | (number | string)[])=>(staticPosition as any)(s, MaxSize)
      const sstW = (w: number | string | (number | string)[] = MaxSize)=>(SetStaticPositionW as any)(w, MaxSize)
      const sstH = (h: number | string | (number | string)[] = MaxSize)=>(SetStaticPositionH as any)(h, MaxSize)
      const bordR = (s: number|string)=>BorderRadiusStatic(s, MaxSize)
      const shSt = (x: number, y: number)=>shadowStatic(x, y, 10, "rgba(0,0,0,0.3)", MaxSize)

  return (
    <DefaultPage
      justifyContent="center"
      justifyItems={"center"}
      alignItems={"center"}
      alignContent={"center"}
    >
      <Box
        mx="auto"
        mt={st(5)}
        mb={st(2)}
        w="95%"
        minW={st(320)}
        maxW="800px"
        display="flex"
        flexDirection="column"
        gapY={st(3)}
      >
        <Breadcrumb 
          items={[
            { label: "Campanhas", href: Campanhas.Home },
            { label: "Criar" }
          ]}
        />
        
        <Text as="h2" fontSize="xl" fontWeight="bold" textAlign="center" mb={st(4)}>
          crie sua campanha
        </Text>

        <Card
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          p={{ base: st(30), md: st(50) }}
          display="flex"
          flexDirection="column"
          gap={st(6)}
        >
          <Box 
            display="flex" 
            flexDirection={{ base: "column", md: "row" }} 
            gap={st(10)} 
            width="100%"
            alignItems="flex-start"
          >
            <VStack align="start" gap={st(4)} width={{ base: "100%", md: "35%" }} flexShrink={0}>
              <Box width="100%">
                <FileUpload.Root maxFiles={1} onChange={handleThumbnailChange}>
                  <FileUpload.HiddenInput accept="image/jpeg,image/png" />
                  <FileUpload.Trigger asChild>
                    <Button variant="outline" width="100%">
                      <LuUpload /> Upload imagem
                    </Button>
                  </FileUpload.Trigger>
                </FileUpload.Root>
                {uploadError && (
                  <Text color="red.500" fontSize="xs" mt={st(1)}>{uploadError}</Text>
                )}
              </Box>
              {preview ? (
                <Image
                  src={preview}
                  alt="Pré-visualização"
                  width="100%"
                  aspectRatio={3/4}
                  maxH={st(280)}
                  objectFit="cover"
                  borderRadius="md"
                />
              ) : (
                <Box width="100%" height={st(220)} bg="gray.100" borderRadius="md" border="1px solid" borderColor="green.400"/>
              )}
              <Text fontSize="sm" color="gray.600">
                Tipos: jpg ou png
                <br />
                Tamanho mínimo: 300 × 300 px
                <br />
                Dimensão mínima: 300 × 300
              </Text>
            </VStack>

            <VStack align="stretch" gap={st(12)} width={{ base: "100%", md: "65%" }}>
              <Input {...register("title")} placeholder="Nome" borderColor="ter" py={st(10)} />
              {errors.title && <Text color="red.500" fontSize="xs">{errors.title.message}</Text>}

              <NativeSelect.Root>
                <NativeSelect.Field {...register("nivelAjuda")} borderColor="ter" py={st(10)}>
                  <option value="">escolha a sua categoria</option>
                  <option value="Alimentos">Alimentos</option>
                  <option value="Roupas">Roupas</option>
                  <option value="Higiene">Higiene</option>
                  <option value="Brinquedos">Brinquedos</option>
                  <option value="Outros">Outros</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              {errors.nivelAjuda && <Text color="red.500" fontSize="xs">{errors.nivelAjuda.message}</Text>}

              <Input {...register("cep")} placeholder="Cep" borderColor="ter" py={st(10)} onChange={(e)=>{
                const v = e.target.value.replace(/\D/g, "").replace(/(\d{5})(\d{0,3}).*/, "$1-$2");
                e.target.value = v;
              }}/>
              {errors.cep && <Text color="red.500" fontSize="xs">{errors.cep.message}</Text>}

              <Input {...register("cidade")} placeholder="Cidade" borderColor="ter" py={st(10)} />
              {errors.cidade && <Text color="red.500" fontSize="xs">{errors.cidade.message}</Text>}

              <Input {...register("rua")} placeholder="nome da rua" borderColor="ter" py={st(10)} />
              {errors.rua && <Text color="red.500" fontSize="xs">{errors.rua.message}</Text>}

              <Input {...register("numero")} placeholder="Número da casa" borderColor="ter" py={st(10)} />
              {errors.numero && <Text color="red.500" fontSize="xs">{errors.numero.message}</Text>}
            </VStack>
          </Box>

          <Textarea
            {...register("description")}
            placeholder="descrição (mínimo 200 caracteres)"
            borderColor="ter"
            borderWidth="1px"
            borderRadius="5px"
            width="100%"
            minH={st(140)}
            py={st(10)}
          />
          {errors.description && <Text color="red.500" fontSize="xs">{errors.description.message}</Text>}

          <Input {...register("endDate")} type="date" borderColor="ter" width="100%" py={st(10)} />
          {errors.endDate && <Text color="red.500" fontSize="xs">{errors.endDate.message}</Text>}

          <HStack justify="center" mt={st(6)}>
            <Button type="submit" minW={st(180)} py={st(12)} colorScheme="green">Criar</Button>
          </HStack>
        </Card>
      </Box>
    </DefaultPage>
  );
}
