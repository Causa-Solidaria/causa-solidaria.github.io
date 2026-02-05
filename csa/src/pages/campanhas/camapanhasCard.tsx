import { Box, Image } from "@chakra-ui/react";
import Heading from "csa/components/ui/heading";
import { SetStaticPositionW, staticPosition } from "csa/lib/utils";
import { Campanhas } from "csa/Rotas.json";
import useNavigate from "csa/hooks/useNavigate";

/** Tipo para os dados de uma campanha */
interface CampanhaData {
  id: string;
  titulo: string;
  descricao?: string | null;
  foto?: string | null;
}

interface CampanhasCardProps {
  idx: number | string;
  campanha: CampanhaData;
}

export default function CampanhasCard({ idx, campanha }: CampanhasCardProps) {
  const { navigate } = useNavigate();

  const handleClick = () => {
    navigate(Campanhas.slug + campanha.id);
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
      onClick={handleClick}
      {...SetStaticPositionW(400, 1970)}
    >
      <Image src={fotoSrc} aspectRatio={4/3} borderRadius={staticPosition(15, 100)} alt={"thumbnail " + idx} />
      <Heading fontSize={64}>{campanha?.titulo}</Heading>
      <Heading fontSize={32}>{campanha?.descricao}</Heading>
    </Box>
  );
}
