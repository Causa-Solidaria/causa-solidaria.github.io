"use client"

import { Button } from "@chakra-ui/react"
import { Flex, Alert } from "csa/components/ui"
import { stCriar, stWCriar, stHCriar } from "./utils"

type CriarOngFormActionsProps = {
  onCancel: () => void
  backendErrors: { message: string }[]
}

export default function CriarOngFormActions({
  onCancel,
  backendErrors
}: CriarOngFormActionsProps) {
  return (
    <>
      <Flex dir="row" justifyContent="space-between">
        <Button
          bg="sec"
          color="white"
          fontSize={stCriar(36)}
          {...stWCriar(438)}
          {...stHCriar(97)}
          p={stCriar(12)}
          marginTop={stCriar(50)}
          type="submit"
        >
          Cadastrar ONG
        </Button>

        <Button
          p={stCriar(12)}
          bg="qui"
          color="black"
          border={`${stCriar(1)} solid black`}
          fontSize={stCriar(36)}
          {...stWCriar(438)}
          {...stHCriar(97)}
          marginTop={stCriar(50)}
          onClick={onCancel}
        >
          cancelar
        </Button>
      </Flex>

      {/* Exibe erros do backend */}
      {backendErrors.length > 0 && (
        <Alert variant="error" title="Erro ao cadastrar">
          {backendErrors.map((err, idx) => (
            <div key={idx}>{err.message}</div>
          ))}
        </Alert>
      )}
    </>
  )
}
