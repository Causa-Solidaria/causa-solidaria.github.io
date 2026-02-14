import Image from "next/image"
import { Campanhas } from "csa/Rotas.json"
import useNavigate from "csa/hooks/useNavigate"
import styles from "./campanhas.module.css"

interface CampanhaData {
  id: string | number
  titulo: string
  descricao?: string | null
  foto?: string | null
}

interface CampanhasCardProps {
  idx: number | string
  campanha: CampanhaData
}

export default function CampanhasCard({ idx, campanha }: CampanhasCardProps) {
  const { navigate } = useNavigate()

  const handleClick = () => {
    navigate(Campanhas.slug + campanha.id)
  }

  let fotoSrc = "/logo.png"
  if (campanha?.foto) {
    fotoSrc = `data:image/png;base64,${campanha.foto}`
  }

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") handleClick() }}
    >
      <Image
        className={styles.cardImage}
        src={fotoSrc}
        alt={`Campanha ${campanha.titulo}`}
        width={340}
        height={255}
        unoptimized
      />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{campanha.titulo}</h3>
        {campanha.descricao && (
          <p className={styles.cardDescription}>{campanha.descricao}</p>
        )}
      </div>
    </div>
  )
}
