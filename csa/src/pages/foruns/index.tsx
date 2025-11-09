import { Button, Center } from "@chakra-ui/react"
import BackRouteBT from "csa/components/BackRouteButton"
import DefaultPage from "csa/components/DefaultPage"
import Box from "csa/components/ui/Box"
import Flex from "csa/components/ui/Flex"
import Heading from "csa/components/ui/heading"
import Input from "csa/components/ui/input"
import { getToken } from "csa/utils/isloged"
import JustifyFull from "csa/utils/JustifyFullCenter"
import { BorderStatic, SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/utils/staticPositions"
import { Form, useForm } from "react-hook-form"


export default function Foruns(){
    const Token = getToken()
    const {control, formState: {errors}, register} = useForm()



    const st =(s: number)=>staticPosition(s, 2835) as string

    return <DefaultPage
        px={st(142)}
        py={st(35)}
    >
        <BackRouteBT 
            scale={st(56) as string}
            {...SetStaticPositionH(67, 2835)}
        /> 
        <Center
            py={st(30)}
        >
            <Box
                {...SetStaticPositionW(2425, 2835)}
                minH={st(2001)}
                {...BorderStatic(3, "solid", "#000", 2835)}
                borderRadius={st(30)}
            >

                <Box
                    padding={st(40)}
                    borderBottom={`${st(3)} solid #000 `}
                >
                    <Center>
                        <Heading
                            color={"#000"}
                            fontSize={85}
                            MaxSizeDisplay={2835}
                        >
                            Fóruns
                        </Heading>
                    </Center>
                </Box>

                <Flex
                    p={st(80)}
                    gapX={st(20)}
                    {...JustifyFull("center")}
                >
                    <Form control={control}>
                        <Input 
                            {...register("Search")}
                            placeholder="Buscar Tópicos ou Palavra-Chave"
                            {...BorderStatic(3, "solid", "#000", 2835)}
                            borderRadius={st(25)}
                            fontSize={st(32)}
                            px={st(30)}
                            {...SetStaticPositionH(85, 2835)}
                            {...SetStaticPositionW(1480, 2835)}
                        >

                        </Input>
                        <Button
                            {...SetStaticPositionH(85, 2835)}
                            {...SetStaticPositionW(345, 2835)}
                            borderRadius={st(25)}
                        >
                            <Heading>Criar Novo Tópico</Heading>
                        </Button>
                    </Form>
                </Flex>
            </Box>
        </Center>
    </DefaultPage>
}

