import { Box, Button, FileUpload, Image } from "@chakra-ui/react";
import DefaultPage from "csa/components/DefaultPage";
import Form from "csa/components/Form";
import usePopup from "csa/hooks/usePopup";
import { ScreenSize } from "csa/utils/getScreenSize";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import { z } from "zod";

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
  endDate: z.string().refine((date) => new Date(date) > new Date(), "Data de término deve ser no futuro"),
  thumbnail: z.instanceof(File).optional(),
});


export default function QueroDoar() {
  const scrSize = ScreenSize();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const popup = usePopup()

  const handleCriarCampanha = async (form: any) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        popup("Você não está logado!");
        return;
      }

      const formData = new FormData();

      formData.append("titulo", form.title);
      formData.append("descricao", form.description);
      formData.append("nivelAjuda", "1"); // ou valor do form
      formData.append("cep", form.cep || "00000-000");
      formData.append("cidade", form.cidade || "Cidade Teste");
      formData.append("estado", form.estado || "Estado Teste");
      formData.append("bairro", form.bairro || "Bairro Teste");
      formData.append("rua", form.rua || "Rua Teste");
      formData.append("numero", form.numero || "123");

      if (form.thumbnail instanceof File) {
        formData.append("foto", form.thumbnail);
      }

      const res = await fetch("/api/campanhas/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // <-- ESSENCIAL
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error(errorData);
        popup("Erro ao criar campanha: " + errorData.error);
        return;
      }

      const result = await res.json();
      console.log("Campanha criada:", result);
      popup("Campanha criada com sucesso!");
    } catch (err) {
      console.error("Erro geral:", err);
      popup("Erro inesperado ao criar campanha");
    }
  };

  function handleThumbnailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setThumbnail(null);
      setPreview(null);
    }
  }

  const formArray = [
    {
      label: "thumbnail",
      register: "thumbnail",
      type: "file",
      accept: ".jpg, .jpeg, .png",
      isFileUpload: true,
      customElement: (
        <Box w={"85%"} m={4} aspectRatio={15 / 9} alignContent="flex-start">
          {preview && (
            <Image
              src={preview}
              minW={"200px"} w={"70%"}
              minH={"120px"} maxH={"500px"}
              aspectRatio={15 / 9}
              borderRadius={"md"}
              justifySelf={"center"}
              align={"center"}
              alt="Thumbnail Preview"
            />
          )}
          <Box bg={"gray.100"} minW={"200px"} w={"70%"} justifySelf={"center"} borderRadius={"md"} p={4}>
            <FileUpload.Root maxFiles={1} onChange={handleThumbnailChange}>
              <FileUpload.HiddenInput />
              <FileUpload.Trigger asChild>
                <Button variant="outline">
                  <LuUpload /> Upload file
                </Button>
              </FileUpload.Trigger>
            </FileUpload.Root>
          </Box>
        </Box>
      ),
    },
    { label: "Título", register: "title", placeholder: "coloque o título aqui", type: "text" },
    { label: "Descrição", register: "description", placeholder: "coloque a descrição aqui", type: "text", as: "textarea" },
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
      <Box minH={scrSize.height * 0.75} flexDirection="column" px="15%" py={"5%"}>
        <Box
          mt={15}
          p={"5%"}
          bg={"qui"}
          minW={"200px"}
          minH={"120px"}
          borderRadius={"15px"}
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Form formArray={formArray} schema={formSchema} set_rota={handleCriarCampanha} />
        </Box>
      </Box>
    </DefaultPage>
  );
}
