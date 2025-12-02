"use client"

import Flex from "csa/components/ui/Flex"
import SupportCard from "./SupportCard"

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

export default function SupportSection() {
  return (
    <Flex dir={["row", "row", "row", "column"]}>
      {supportItems.map((item) => (
        <SupportCard
          key={item.id}
          title={item.title}
          image={item.image}
        />
      ))}
    </Flex>
  )
}
