import { Box, Button, FileUpload, Image, Input, Text, HStack, VStack, NativeSelect } from "@chakra-ui/react";
import DefaultPage from "csa/components/DefaultPage";
import usePopup from "csa/hooks/usePopup";
import { ScreenSize } from "csa/utils/getScreenSize";
import { useMemo, useState } from "react";
import { LuUpload } from "react-icons/lu";
import { z } from "zod";
import { handleCriarCampanha } from "./FormConfig/submit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "./FormConfig/schema";
import CardDefault from "csa/components/Card";

export default function QueroDoar() {
  const scrSize = ScreenSize();
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
  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    handleCriarCampanha({ ...data, thumbnailString }, popup);
  }

  return (
    <DefaultPage
      justifyContent="center"
      justifyItems={"center"}
      alignItems={"center"}
      alignContent={"center"}
    >
      <CardDefault
        mx={10}
        mt={5}
        mb={2}
        px={10}
        pt={2}
        pb={2}
        w="95%"
        minW={"320px"}
        maxW={"1000px"}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: '100%' }}
        display="flex"
        flexDirection="column"
        gapY={3}
      >
        <Text as="h2" fontSize="xl" fontWeight="bold" textAlign="center" mb={10}>
          crie sua campanha
        </Text>

        <HStack align="start" gap={6} flexWrap="wrap">
          <VStack align="start" gap={2} flex={1} minW="320px">
            <Box w={"full"}>
              <FileUpload.Root maxFiles={1} onChange={handleThumbnailChange}>
                <FileUpload.HiddenInput accept="image/jpeg,image/png" />
                <FileUpload.Trigger asChild>
                  <Button variant="outline" w={"full"}>
                    <LuUpload /> Upload imagem
                  </Button>
                </FileUpload.Trigger>
              </FileUpload.Root>
              {uploadError && (
                <Text color="red.500" fontSize="xs" mt={1}>{uploadError}</Text>
              )}
            </Box>
            {preview ? (
              <Image
                src={preview}
                alt="Pré-visualização"
                w="full"
                aspectRatio={3/4}
                maxH="260px"
                objectFit="cover"
                borderRadius="md"
              />
            ) : (
              <Box w="100%" h="260px" bg="gray.100" borderRadius="md" border="1px" borderColor="green.400"/>
            )}
            <Text fontSize="sm" color="gray.600">
              Tipos: jpg ou png
              <br />
              Tamanho mínimo: 300 × 300 px
              <br />
              Dimensão mínima: 300 × 300
            </Text>

            
          </VStack>

          <VStack align="stretch" gap={3} flex={1} minW="320px">
            <Input {...register("title")} placeholder="Nome" borderColor="ter" />
            {errors.title && <Text color="red.500" fontSize="xs">{errors.title.message}</Text>}

            <NativeSelect.Root>
              <NativeSelect.Field {...register("nivelAjuda")} borderColor="ter">
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

            <Input {...register("cep")} placeholder="Cep" borderColor="ter" onChange={(e)=>{
              const v = e.target.value.replace(/\D/g, "").replace(/(\d{5})(\d{0,3}).*/, "$1-$2");
              e.target.value = v;
            }}/>
            {errors.cep && <Text color="red.500" fontSize="xs">{errors.cep.message}</Text>}

            <Input {...register("cidade")} placeholder="Cidade" borderColor="ter" />
            {errors.cidade && <Text color="red.500" fontSize="xs">{errors.cidade.message}</Text>}

            <Input {...register("rua")} placeholder="nome da rua" borderColor="ter" />
            {errors.rua && <Text color="red.500" fontSize="xs">{errors.rua.message}</Text>}

            <Input {...register("numero")} placeholder="Número da casa" borderColor="ter" />
            {errors.numero && <Text color="red.500" fontSize="xs">{errors.numero.message}</Text>}
          </VStack>
        </HStack>

        <Box mt={3}>
          <textarea {...register("description")} 
            placeholder="descrição (mínimo 200 Linhas)" 
            style={{ borderColor: "ter", minHeight: "120px", width: "100%", border: "1px solid", borderRadius: "5px"}} />
          {errors.description && <Text color="red.500" fontSize="xs">{errors.description.message}</Text>}
        </Box>

        <Box mt={3}>
          <Input {...register("endDate")} type="date" borderColor="ter" />
          {errors.endDate && <Text color="red.500" fontSize="xs">{errors.endDate.message}</Text>}
        </Box>

        <HStack justify="center" mt={6} bottom={0}>
          <Button type="submit" minW={"100px"} maxW={"300px"} w={"25%"} colorScheme="green">Criar</Button>
         </HStack>
      </CardDefault>
    </DefaultPage>
  );
}
