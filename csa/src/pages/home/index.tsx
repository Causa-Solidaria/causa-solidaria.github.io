"use client"

import { Center, Icon, Image } from "@chakra-ui/react"
import { Heading, Button, Flex } from "csa/components/ui"
import { LuArrowRight, LuHeart, LuHandshake, LuShare2 } from "react-icons/lu"
import Rotas from "csa/Rotas.json"
import styles from "./index.module.css"
import DefaultPage from "csa/components/DefaultPage"
import useNavigate from "csa/hooks/useNavigate"
import { mockOngs } from "csa/mocks/ongs"

const supportItems = [
  {
    id: 1,
    title: "precisa de ajuda?",
    image: "pngegg (7) 2.png"
  },
  {
    id: 2,
    title: "suporte em libras",
    image: "pngegg (8) 2.png"
  }
]

const helpCards = [
  {
    id: 1,
    icon: LuHeart,
    title: "doando",
    description: "contribua com qualquer valor",
    linkText: "doar agora",
    href: Rotas.Campanhas.Home,
  },
  {
    id: 2,
    icon: LuHandshake,
    title: "voluntariando-se",
    description: "participe das ações presenciais",
    linkText: "quero me voluntariar",
    href: Rotas.ONGs.Home,
  },
  {
    id: 3,
    icon: LuShare2,
    title: "compartilhando",
    description: "compartilhe nossas campanhas",
    linkText: "compartilhar",
    href: Rotas.Campanhas.Home,
  },
]

export default function HomeComponents() {
  const { navigate } = useNavigate();

  return (
    <DefaultPage>
      {/* ==================== Hero Section ==================== */}
      <Flex className={styles.heroSection}>
        <Heading className={styles.heroSectionTitle}>
          transforme pequenos gestos em grandes mudanças
        </Heading>
        <Heading className={styles.heroSectionSubtitle}>
          doe amor e compartilhe esperança
        </Heading>

        <Button
          className={styles.heroSectionButton}
          onClick={() => navigate(Rotas.Campanhas.Home)}
        >
          Quero Ajudar
        </Button>
      </Flex>

      {/* ==================== About Section ==================== */}
      <Flex className={styles.aboutSection}>
        <Image
          className={styles.aboutSectionImage}
          src="./ChatGPT Image 11 de ago. de 2025, 15_44_28 2.png"
          alt="Banco de Alimentos"
        />

        {/* ==================== Mission Section ==================== */}
        <Flex className={styles.missionSection}>
          <Heading className={styles.missionSectionTitle}>
            Nossa missão é espalhar cuidado, dignidade e esperança
          </Heading>

          <Heading className={styles.missionSectionDescription}>
            somos uma organização que acredita no poder da empatia, atuamos com campanhas de arrecadação de alimentos, brinquedos, agasalhos e apoio a comunidades vulneráveis em todo o brasil
          </Heading>

          <Center>
            <Button
              className={styles.missionSectionButton}
              aria-label="Conheça Nossas Ações"
              onClick={() => navigate(Rotas.Campanhas.Home)}
            >
              <Heading className={styles.missionSectionButtonText}>
                Conheça Nossas Campanhas
              </Heading>
              <Icon as={LuArrowRight} className={styles.missionSectionButtonIcon} />
            </Button>
          </Center>
        </Flex>

        {/* ==================== Support Section ==================== */}
        <Flex className={styles.supportSection}>
          {supportItems.map((item) => (
            <Flex key={item.id} className={styles.supportCard}>
              <Image
                className={styles.supportCardImage}
                src={item.image}
                alt={item.title}
              />
              <Heading className={styles.supportCardTitle}>
                {item.title}
              </Heading>
            </Flex>
          ))}
        </Flex>
      </Flex>

      {/* ==================== ONGs em Destaque ==================== */}
      <Flex className={styles.ongsSection}>
        <Heading className={styles.ongsSectionTitle}>ONGs em Destaque:</Heading>
        <Flex className={styles.ongsGrid}>
          {mockOngs.map((ong) => (
            <Flex
              key={ong.id}
              className={styles.ongItem}
              onClick={() => navigate(Rotas.ONGs.Home)}
            >
              <Image
                className={styles.ongItemImage}
                src="/logo.png"
                alt={ong.nome}
              />
              <Heading className={styles.ongItemName}>{ong.nome}</Heading>
            </Flex>
          ))}
        </Flex>
      </Flex>

      {/* ==================== Suport Section (Como você pode ajudar) ==================== */}
      <Flex className={styles.suportSection}>
        <Heading className={styles.suportSectionTitle}>como você pode ajudar?</Heading>
        <Flex className={styles.suportSectionCards}>
          {helpCards.map((card) => (
            <Flex key={card.id} className={styles.helpCard} onClick={() => navigate(card.href)}>
              <Icon as={card.icon} className={styles.helpCardIcon} />
              <Heading className={styles.helpCardTitle}>{card.title}</Heading>
              <Heading className={styles.helpCardDescription}>{card.description}</Heading>
              <Flex className={styles.helpCardLink}>
                <span>{card.linkText}</span>
                <Icon as={LuArrowRight} />
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </DefaultPage>
  )
}
