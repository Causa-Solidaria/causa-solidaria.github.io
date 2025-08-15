import { Box, Button, FileUpload, Image } from "@chakra-ui/react";
import DefaultPage from "csa/components/DefaultPage";
import Form from "csa/components/Form";
import usePopup from "csa/hooks/usePopup";
import { ScreenSize } from "csa/utils/getScreenSize";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import { z } from "zod";
import LZString from "lz-string";

// Validação do formulário
const formSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  nivelAjuda: z.string().min(1, "Nível de ajuda é obrigatório"),
  cep: z.string().min(1, "CEP é obrigatório"),
  cidade: z.string().min(1, "Cidade é obrigatória"),
  estado: z.string().min(1, "Estado é obrigatório"),
  bairro: z.string().min(1, "Bairro é obrigatório"),
  rua: z.string().min(1, "Rua é obrigatória"),
  numero: z.string().min(1, "Número é obrigatório"),
  endDate: z.string().refine(
    (date) => new Date(date) > new Date(),
    "Data de término deve ser no futuro"
  ),
  thumbnail: z.string().optional(), // agora é string Base64 comprimida
});

export default function QueroDoar() {
  const scrSize = ScreenSize();
  const popup = usePopup();

  const [thumbnailString, setThumbnailString] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Lê o arquivo, transforma em Base64 e comprime
  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result?.toString().split(",")[1];
      if (!base64) return;

      const compressed = base64;
      setThumbnailString(compressed);
      setPreview(URL.createObjectURL(file));
    };
    reader.readAsDataURL(file);
  };

  // Envia o formulário para a API
  const handleCriarCampanha = async (form: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return popup("Você não está logado!");

      const body = {
        titulo: form.title,
        descricao: form.description ?? "",
        nivelAjuda: form.nivelAjuda ?? "1",
        cep: form.cep ?? "00000-000",
        cidade: form.cidade ?? "Cidade Teste",
        estado: form.estado ?? "Estado Teste",
        bairro: form.bairro ?? "Bairro Teste",
        rua: form.rua ?? "Rua Teste",
        numero: form.numero ?? "123",
        endDate: form.endDate,
        thumbnail: thumbnailString, // string Base64 comprimida
      };

      const res = await fetch("/api/campanhas/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error(errorData);
        return popup("Erro ao criar campanha: " + errorData.error);
      }

      const result = await res.json();
      console.log("Campanha criada:", result);
      popup("Campanha criada com sucesso!");
    } catch (err) {
      console.error("Erro geral:", err);
      popup("Erro inesperado ao criar campanha");
    }
  };

  // Configuração dos campos do formulário
  const formArray = [
    {
      label: "Thumbnail",
      register: "thumbnail",
      type: "file",
      accept: ".jpg, .jpeg, .png",
      isFileUpload: true,
      customElement: (
        <Box w="85%" m={4}>
          {preview && (
            <Image
              src={preview}
              alt="Thumbnail Preview"
              w="70%"
              minW="200px"
              maxH="500px"
              borderRadius="md"
              mb={2}
            />
          )}
          <Box bg="gray.100" w="70%" minW="200px" borderRadius="md" p={4}>
            <FileUpload.Root maxFiles={1} onChange={handleThumbnailChange}>
              <FileUpload.HiddenInput />
              <FileUpload.Trigger asChild>
                <Button variant="outline" leftIcon={<LuUpload />}>
                  Upload file
                </Button>
              </FileUpload.Trigger>
            </FileUpload.Root>
          </Box>
        </Box>
      ),
    },
    { label: "Título", register: "title", placeholder: "Coloque o título aqui", type: "text" },
    { label: "Descrição", register: "description", placeholder: "Coloque a descrição aqui", type: "text", as: "textarea" },
    { label: "Nível de Ajuda", register: "nivelAjuda", type: "text" },
    { label: "CEP", register: "cep", type: "text" },
    { label: "Cidade", register: "cidade", type: "text" },
    { label: "Estado", register: "estado", type: "text" },
    { label: "Bairro", register: "bairro", type: "text" },
    { label: "Rua", register: "rua", type: "text" },
    { label: "Número", register: "numero", type: "text" },
    { label: "Data de término", register: "endDate", type: "date" },
  ];

  return (
    <DefaultPage>
      <Box minH={scrSize.height * 0.75} flexDirection="column" px="15%" py="5%">
        <Box mt={15} p="5%" bg="qui" minW="200px" minH="120px" borderRadius="15px">
          <Form formArray={formArray} schema={formSchema} set_rota={handleCriarCampanha} />
        </Box>
      </Box>
    </DefaultPage>
  );
}
