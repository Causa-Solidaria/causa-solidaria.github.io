import { Image } from "@chakra-ui/react";
import CardDefault from "csa/components/Card";
import Card from "csa/components/Card/utils";



export default function CampanhasCard({idx, campanha}: {idx: number | string, campanha: any}) {
    return (
        <CardDefault
            Root={(<Image src={campanha?.thubnail} alt={"thubnail " + idx}/>)}
            maxW={`250px`} overflow="hidden" p={0} _hover={{scale: 1.025}}
        >
            <Card.Title>
                {campanha?.title}
            </Card.Title>
            <Card.Description>
                {campanha?.description}
                </Card.Description>
        </CardDefault>
    );
}
