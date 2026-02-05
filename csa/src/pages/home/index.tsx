"use client"

import { Center, Icon, Image } from "@chakra-ui/react"
import { Heading, Button, Flex } from "csa/components/ui"
import { LuArrowRight } from "react-icons/lu"
import Rotas from "csa/Rotas.json"
import styles from "./index.module.css"
import DefaultPage from "csa/components/DefaultPage"

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

export default function HomeComponents() {
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
          onClick={() => { window.location.href = Rotas.Campanhas.Home }}
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
              onClick={() => { window.location.href = Rotas.Campanhas.Home }}
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

      {/* ==================== Suport Section (Como você pode ajudar) ==================== */}
      <Flex className={styles.suportSection}>
        <Heading className={styles.suportSectionTitle}>Como você pode ajudar</Heading>
        <Flex className={styles.suportSectionCards}>

        </Flex>
      </Flex>
    </DefaultPage>
  )
}
