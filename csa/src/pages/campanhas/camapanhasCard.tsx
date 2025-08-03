import { Image } from "@chakra-ui/react";
import CardDefault from "csa/components/Card";
import Card from "csa/components/Card/utils";


export default function CampanhasCard({idx, campanha}: {idx: number | string, campanha: any}) {
    const RedirecionaParaACampanha = ()=>{
        window.location.href = "/c/" + campanha.id
    }

    return (
        <CardDefault
            Root={(<Image src={campanha?.thubnail || "/logo.png"} alt={"thubnail " + idx}/>)}
            maxW={`250px`} overflow="hidden" p={0} _hover={{scale: 1.025}}
            onClick={RedirecionaParaACampanha}
        >
            <Card.Title>
                {campanha?.titulo}
            </Card.Title>
            <Card.Description>
                {campanha?.descricao}
                </Card.Description>
        </CardDefault>
    );
}
