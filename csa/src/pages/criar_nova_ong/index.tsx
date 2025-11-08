"use client"
import React from "react";
import { Button, Center, createListCollection, Text, FileUpload, Image } from "@chakra-ui/react";
import Box from "csa/components/ui/Box";
import Flex from "csa/components/ui/Flex";
import Input from "csa/components/ui/input";
import Heading from "csa/components/ui/heading";
import FormField from "csa/components/ui/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import DefaultPage from "csa/components/DefaultPage";
import formSchema from "csa/forms_validate/Criar_Nova_Ong/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/router";
import { staticPosition, SetStaticPositionW, SetStaticPositionH } from "csa/utils/staticPosition";
import JustifyFull, { AlignFull } from "csa/utils/JustifyFullCenter";
import { getToken } from "csa/utils/isloged";
import { LuUpload } from "react-icons/lu";


export default function CriarNovaOng() {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, reset, setError, setValue } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

   
    const [backendErrors, setBackendErrors] = React.useState<any[]>([]);
    const [logoString, setLogoString] = React.useState<string | null>(null);
    const [logoPreview, setLogoPreview] = React.useState<string | null>(null);
    const [uploadError, setUploadError] = React.useState<string | null>(null);

    const handleLogoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const isJpgPng = /image\/(jpeg|png)/.test(file.type) || /\.(jpe?g|png)$/i.test(file.name);
        if (!isJpgPng) {
            setUploadError("Apenas arquivos .jpg ou .png");
            setLogoString(null);
            setLogoPreview(null);
            setValue("logo", undefined as any);
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
            setLogoString(null);
            setLogoPreview(null);
            setValue("logo", undefined as any);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result?.toString().split(",")[1];
            if (!base64) return;
            const compressed = base64; // aqui pode comprimir no futuro, se necessário
            setLogoString(compressed);
            setLogoPreview(URL.createObjectURL(file));
            setUploadError(null);
            setValue("logo", compressed as any, { shouldValidate: true });
        };
        reader.readAsDataURL(file);
    };


    const itens_atuacao = createListCollection({
            items:[
                { label: 'educação', value: 'educacao' },
                { label: 'saúde', value: 'saude' },
                { label: 'meio ambiente', value: 'meio_ambiente' },
                { label: 'direitos humanos', value: 'direitos_humanos' },
                { label: 'animais', value: 'animais' },
                { label: 'cultura e arte', value: 'cultura_e_arte' },
                { label: 'assistência social', value: 'assistencia_social' },
                { label: 'desenvolvimento comunitário', value: 'desenvolvimento_comunitario' },
                { label: 'outros', value: 'outros' },
            ]

        })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setBackendErrors([]);
        try {
            // Recupera o token JWT do localStorage
            const token = getToken();
            const response = await fetch("/api/ong", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { "Authorization": `Bearer ${token}` } : {})
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (Array.isArray(errorData.message)) {
                    setBackendErrors(errorData.message);
                    errorData.message.forEach((err: any) => {
                        if (err.path && err.message) {
                            setError(err.path[0], { type: "server", message: err.message });
                        }
                    });
                } else {
                    setBackendErrors([{ message: errorData.message }]);
                }
                return;
            }

            alert("ONG cadastrada com sucesso!");
            reset();
            router.push("/ongs");
        } catch (error) {
            console.error(error);
            setBackendErrors([{ message: "Erro ao cadastrar ONG" }]);
        }
    };

    const fieldConfigs = [
        { name: "nome", label: "Nome da ONG", type: 'text' },
        { name: "cnpj", label: "CNPJ", type: 'text' },
        { name: "areaAtuacao", label: "Área de Atuação", type: 'select', options: (itens_atuacao.items || []).map(i => ({ label: i.label, value: i.value })) },
        { name: "descricao", label: "Descrição da ONG", type: 'textarea', height: 144 },
        { name: "cep", label: "CEP", type: 'text' },
        { name: "contato", label: "Email ou Telefone para Contato", type: 'text' },
        { name: "site", label: "Site ou redeSocial", type: 'text' },
    ] as const;

    const getFieldError = (field: string) => {
        const errorRecord = errors as Record<string, { message?: unknown }>;
        const message = errorRecord[field]?.message;
        if (message == null) return undefined;
        return typeof message === "string" ? message : String(message);
    };




    return (
        <DefaultPage 
            bg={"white"}
        >
            
            <Center
                display={"flex"}
                flexDir={"column"}
                mb={staticPosition(100,2438)}
            >
                <Box
                    {...SetStaticPositionW(1497,2438)}
                    mb={staticPosition(24,2438)}
                >
                    <Flex alignItems="center" justifyContent="center" position="relative" {...SetStaticPositionH(76,2438)}>
                        <Button
                            position="absolute"
                            left={0}
                            bg={"transparent"}
                            color={"black"}
                            fontSize={staticPosition(76,2438)}
                            type="button"
                            onClick={() => router.back()}
                        >
                            {"←"}
                        </Button>
                        <Heading fontSize={96} MaxSizeDisplay={2438} fontWeight={900} color="#000" w={"full"} textAlign="center">
                            Cadastrar Nova ONG
                        </Heading>
                    </Flex>
                </Box>

                <Box
                    as="form"
                    display={"flex"}
                    flexDir={"column"}
                    onSubmit={handleSubmit(onSubmit)} 
                    {...SetStaticPositionW(1497,2438)}
                    borderRadius={staticPosition(50,2438)}
                    border="solid black"
                    borderWidth={staticPosition(5,2438)}
                    p={staticPosition(100,2438)}
                    gap={staticPosition(10,2438)}
                >
                    <Flex dir="column" gap={staticPosition(20,2438)}>
                        {fieldConfigs.map((cfg) => {
                            const name = (cfg as any).name as string;
                            const label = (cfg as any).label as string;
                            const type = (cfg as any).type as any;
                            const options = (cfg as any).options as any;
                            const height = (cfg as any).height as any;
                            return (
                                <FormField
                                    key={name}
                                    name={name}
                                    label={label}
                                    register={register(name as keyof z.infer<typeof formSchema> as any)}
                                    error={getFieldError(name)}
                                    height={height ?? 72}
                                    fontSize={26}
                                    type={type}
                                    options={options}
                                />
                            );
                        })}
                    </Flex>

                    {/* Upload da Logo da ONG (após os campos) */}
                    <Flex dir="column" gap={staticPosition(10,2438)}>
                        <Text fontSize={staticPosition(32,2438)} fontWeight={600} color="#000">
                            Logo da ONG
                        </Text>
                        <FileUpload.Root maxFiles={1} onChange={handleLogoChange}>
                            <FileUpload.HiddenInput accept="image/jpeg,image/png" />
                            <FileUpload.Trigger asChild>
                                <Button
                                    variant="outline"
                                    borderColor="#000"
                                    borderWidth={staticPosition(2,2438)}
                                    {...SetStaticPositionH(65,2438)}
                                >
                                    <LuUpload />&nbsp; Upload imagem (jpg/png)
                                </Button>
                            </FileUpload.Trigger>
                        </FileUpload.Root>
                        {uploadError && (
                            <Text color="red" fontSize={staticPosition(20,2438)}>{uploadError}</Text>
                        )}
                        {logoPreview ? (
                            <Image
                                src={logoPreview as string}
                                alt="Pré-visualização da logo"
                                {...SetStaticPositionW(1300,2438)}
                                {...SetStaticPositionH(300,2438)}
                                objectFit="contain"
                                borderRadius={staticPosition(12,2438)}
                                border={`${staticPosition(2,2438)} solid #000`}
                            />
                        ) : (
                            <Box
                                {...SetStaticPositionW(1300,2438)}
                                {...SetStaticPositionH(300,2438)}
                                bg="#F3F3F3"
                                borderRadius={staticPosition(12,2438)}
                                border={`${staticPosition(2,2438)} solid #000`}
                            />
                        )}
                        <Text fontSize={staticPosition(20,2438)} color="#555">
                            Tipos aceitos: jpg, png • Dimensão mínima: 300 × 300
                        </Text>
                    </Flex>
                    <Flex dir={"row"} justifyContent={"space-between"} >
                        <Button
                            bg={"sec"}
                            color={"white"}
                            fontSize={staticPosition(36,2438)}
                            {...SetStaticPositionW(438,2438)}
                            {...SetStaticPositionH(97,2438)}
                            p={staticPosition(12,2438)}
                            marginTop={staticPosition(50,2438)}
                            type="submit"
                        >
                            Cadastrar ONG
                        </Button>

                        <Button
                            p={staticPosition(12,2438)}
                            bg={"qui"}
                            color={"black"}
                            border={`${staticPosition(1,2438)} solid black`}
                            fontSize={staticPosition(36,2438)}
                            {...SetStaticPositionW(438,2438)}
                            {...SetStaticPositionH(97,2438)}
                            marginTop={staticPosition(50,2438)}
                            onClick={() => { reset(); setLogoString(null); setLogoPreview(null); setUploadError(null); setValue("logo", undefined as any); }}
                        >
                            cancelar
                        </Button>
                    </Flex>
                    {/* Exibe erros do backend (ZodError) */}
                    {backendErrors.length > 0 && (
                        <Box color="red" mt={staticPosition(8,2438)}>
                            {backendErrors.map((err, idx) => (
                                <Text key={idx} fontSize={staticPosition(20,2438)}>{err.message}</Text>
                            ))}
                        </Box>
                    )}
                </Box>
            </Center>
        </DefaultPage>
    )
}