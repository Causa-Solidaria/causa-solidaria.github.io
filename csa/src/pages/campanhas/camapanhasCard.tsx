import { Image } from "@chakra-ui/react";
import CardDefault from "csa/components/Card";
import Card from "csa/components/Card/utils";

export default function CampanhasCard({ idx, campanha }: { idx: number | string; campanha: any }) {
  const RedirecionaParaACampanha = () => {
    window.location.href = "/c/" + campanha.id;
  };

  // Se salvou no campo "foto" do banco
  let fotoSrc = "/logo.png"; // fallback
  if (campanha?.foto) {
    fotoSrc = `data:image/png;base64,${campanha.foto}`;
  }

  return (
    <CardDefault
      Root={<Image src={fotoSrc} aspectRatio={4/3} borderRadius={"md"} alt={"thumbnail " + idx} />}
      maxW="300px"
      aspectRatio={5/7}
      overflow="hidden"
      p={4}
      _hover={{ scale: 1.025 }}
      onClick={RedirecionaParaACampanha}
    >
      <Card.Title>{campanha?.titulo}</Card.Title>
      <Card.Description>{campanha?.descricao}</Card.Description>
    </CardDefault>
  );
}
