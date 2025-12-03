"use client"

import React from "react"
import { Button, Text, FileUpload, Image } from "@chakra-ui/react"
import { Box, Flex, FormField } from "csa/components/ui"
import { LuUpload } from "react-icons/lu"
import { stCriar, stWCriar, stHCriar } from "./utils"

type CriarOngFormFieldsProps = {
  fieldConfigs: readonly {
    name: string
    label: string
    type: string
    options?: { label: string; value: string }[]
    height?: number
  }[]
  register: any
  getFieldError: (field: string) => string | undefined
  logoPreview: string | null
  uploadError: string | null
  onLogoChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function CriarOngFormFields({
  fieldConfigs,
  register,
  getFieldError,
  logoPreview,
  uploadError,
  onLogoChange
}: CriarOngFormFieldsProps) {
  return (
    <>
      <Flex dir="column" gap={stCriar(20)}>
        {fieldConfigs.map((cfg) => (
          <FormField
            key={cfg.name}
            name={cfg.name}
            label={cfg.label}
            register={register(cfg.name)}
            error={getFieldError(cfg.name)}
            height={cfg.height ?? 72}
            fontSize={26}
            type={cfg.type as any}
            options={cfg.options}
          />
        ))}
      </Flex>

      {/* Upload da Logo da ONG */}
      <Flex dir="column" gap={stCriar(10)}>
        <Text fontSize={stCriar(32)} fontWeight={600} color="#000">
          Logo da ONG
        </Text>
        <FileUpload.Root maxFiles={1} onChange={onLogoChange}>
          <FileUpload.HiddenInput accept="image/jpeg,image/png" />
          <FileUpload.Trigger asChild>
            <Button
              variant="outline"
              borderColor="#000"
              borderWidth={stCriar(2)}
              {...stHCriar(65)}
            >
              <LuUpload />&nbsp; Upload imagem (jpg/png)
            </Button>
          </FileUpload.Trigger>
        </FileUpload.Root>
        {uploadError && (
          <Text color="red" fontSize={stCriar(20)}>{uploadError}</Text>
        )}
        {logoPreview ? (
          <Image
            src={logoPreview}
            alt="Pré-visualização da logo"
            {...stWCriar(1300)}
            {...stHCriar(300)}
            objectFit="contain"
            borderRadius={stCriar(12)}
            border={`${stCriar(2)} solid #000`}
          />
        ) : (
          <Box
            {...stWCriar(1300)}
            {...stHCriar(300)}
            bg="#F3F3F3"
            borderRadius={stCriar(12)}
            border={`${stCriar(2)} solid #000`}
          />
        )}
        <Text fontSize={stCriar(20)} color="#555">
          Tipos aceitos: jpg, png • Dimensão mínima: 300 × 300
        </Text>
      </Flex>
    </>
  )
}
