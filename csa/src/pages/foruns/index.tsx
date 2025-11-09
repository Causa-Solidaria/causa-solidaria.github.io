import { Center } from "@chakra-ui/react"
import BackRouteBT from "csa/components/BackRouteButton"
import DefaultPage from "csa/components/DefaultPage"
import Box from "csa/components/ui/Box"
import Heading from "csa/components/ui/heading"
import { getToken } from "csa/utils/isloged"
import { SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/utils/staticPosition"




export default function Foruns(){
    const Token = getToken()

    return <DefaultPage
        px={staticPosition(142, 2835)}
        py={staticPosition(35, 2835)}
    >
        <BackRouteBT 
            scale={staticPosition(56, 2835) as string}
            {...SetStaticPositionH(67, 2835)}
        /> 
        <Center
            py={staticPosition(30, 2385)}
        >
            <Box
                {...SetStaticPositionW(2425, 2835)}
                minH={staticPosition(2001,2835)}
                border={`${staticPosition(3, 1871)} solid #000 `}
                borderRadius={staticPosition(30, 2835)}
            >

                <Box
                    padding={staticPosition(40, 2835)}
                    borderBottom={`${staticPosition(3, 1871)} solid #000 `}
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

            </Box>
        </Center>
    </DefaultPage>
}

