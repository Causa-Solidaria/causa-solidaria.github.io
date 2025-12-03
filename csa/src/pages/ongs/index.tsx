"use client"

import DefaultPage from "csa/components/DefaultPage"
import { OngsContent } from "csa/components/pagesComponents/Ongs"
import JustifyFull, { AlignFull } from "csa/lib/utils"

export default function ONGsPage() {
  return (
    <DefaultPage
      bg="#02E351"
      {...JustifyFull()}
      {...AlignFull()}
      minH="100vh"
    >
      <OngsContent />
    </DefaultPage>
  )
}