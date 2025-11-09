import { Box, Image } from "@chakra-ui/react";
import Heading from "csa/components/ui/heading";
import { SetStaticPositionW, staticPosition } from "csa/utils/staticPositions";
import {Campanhas} from "csa/Rotas.json"


export default function CampanhasCard({ idx, campanha }: { idx: number | string; campanha: any }) {
  const RedirecionaParaACampanha = () => {
    window.location.href = Campanhas.slug + campanha.id;
  };

  // Se salvou no campo "foto" do banco
  let fotoSrc = "/logo.png"; // fallback
  if (campanha?.foto) {
    fotoSrc = `data:image/png;base64,${campanha.foto}`;
  }

  return (
    <Box
      aspectRatio={5/7}
      overflow="hidden"
      p={4}
      _hover={{ scale: 1.025 }}
      onClick={RedirecionaParaACampanha}
      {...SetStaticPositionW(400, 1970)}
    >
      <Image src={fotoSrc} aspectRatio={4/3} borderRadius={staticPosition(15, 100)} alt={"thumbnail " + idx} />
      <Heading fontSize={64}>{campanha?.titulo}</Heading>
      <Heading fontSize={32}>{campanha?.descricao}</Heading>
    </Box>
  );
}
