import { Box, Button, Center, FileUpload, Icon, Image, Input, Link } from "@chakra-ui/react";
import Footer from "csa/components/footer";
import Form from "csa/components/Form";
import Header from "csa/components/header";
import { ScreenSize } from "csa/utils/getScreenSize";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import { z } from "zod";


const formSchema = z.object({
    title: z.string().min(1, "Título é obrigatório"),
    description: z.string().optional(),
    thumbnail: z.instanceof(File).optional(),
    goal: z.number().min(1, "Meta deve ser maior que zero"),
    endDate: z.string().refine((date) => new Date(date) > new Date(), "Data de término deve ser no futuro"),
});

// Define os campos que vão aparecer no formulário
const formArray = [
    { label: "titulo", register: "title", placeholder: "coloque o título aqui", type: "text" },
    { label: "descrição", register: "description", placeholder: "coloque a descrição aqui", type: "text" },
    { label: "meta", register: "goal", placeholder: "coloque a meta aqui", type: "number" },
    { label: "data de término", register: "endDate", type: "date" },
    { 
        label: "thumbnail", 
        register: "thumbnail", 
        type: "file", 
        accept: ".jpg, .jpeg, .png",
        isFileUpload: true,
        children: (
            <Input type="file" accept=".jpg, .jpeg, .png" />
        )
    },
];

const handleCriarCampanha = async (data: object) => {
  // formulario par a criação de campanha
};


export default function QueroDoar() {
  const scrSize = ScreenSize();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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
  
  return (
    <>
        <Header/>
        <Box minH={scrSize.height * 0.75} flexDirection="column" padding="7%">
            <Box 
              m={4} mt={15} p={4} 
              bg={"qui"} 
              minW={"600px"}  minH={"400px"} 
              borderRadius={"15px"} 
              justifyItems={"center"}
              alignItems={"center"}
            >
              <Box w={"85%"} m={4} aspectRatio={15/9} backgroundImage={preview} justifyContent={"center"} alignContent="flex-end" >
                
                {preview && <Image 
                  src={preview} 
                  minW={'200px'} w={"70%"}
                  minH={"120px"} 
                  aspectRatio={15/9}
                  borderRadius={"md"}
                  justifySelf={"center"}
                  align={"center"}
                  alt="Thumbnail Preview" 
                />}
                
                <Box bg={"gray.100"} minW={"200px"} w={"70%"} justifySelf={"center"} borderRadius={"md"} p={4}>
                  <FileUpload.Root maxFiles={1} onChange={handleThumbnailChange} >
                    <FileUpload.HiddenInput />
                    <FileUpload.Trigger asChild>
                      <Button variant="outline">
                        <LuUpload /> Upload file
                      </Button>
                    </FileUpload.Trigger>
                  </FileUpload.Root>
                </Box>

              </Box>
              
              <Form formArray={formArray} schema={formSchema} set_rota={handleCriarCampanha}/>
            </Box>
        </Box>
        <Footer/>
    </>
  );
}