"use client"

import type {
  ButtonProps,
  GroupProps,
  InputProps,
  StackProps,
} from "@chakra-ui/react"
import {
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Stack,
  mergeRefs,
  useControllableState,
} from "@chakra-ui/react"
import * as React from "react"
import { LuEye, LuEyeOff } from "react-icons/lu"
import styles from "./ui.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames"

export interface PasswordVisibilityProps {
  defaultVisible?: boolean
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
  visibilityIcon?: { on: React.ReactNode; off: React.ReactNode }
}

export interface PasswordInputProps
  extends InputProps,
    PasswordVisibilityProps {
  rootProps?: GroupProps
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(function PasswordInput(props, ref) {
  const {
    rootProps,
    defaultVisible,
    visible: visibleProp,
    onVisibleChange,
    visibilityIcon = { on: <LuEye />, off: <LuEyeOff /> },
    ...rest
  } = props

  const [visible, setVisible] = useControllableState({
    value: visibleProp,
    defaultValue: defaultVisible || false,
    onChange: onVisibleChange,
  })

  const inputRef = React.useRef<HTMLInputElement>(null)
  return (
    <InputGroup
      className={styles.passwordInput}
      endElement={
        <VisibilityTrigger
          disabled={rest.disabled}
          onPointerDown={(e) => {
            if (rest.disabled) return
            if (e.button !== 0) return
            e.preventDefault()
            setVisible(!visible)
          }}
        >
          {visible ? visibilityIcon.off : visibilityIcon.on}
        </VisibilityTrigger>
      }
      {...rootProps}
    >
      <Input
        className={styles.input}
        {...rest}
        ref={mergeRefs(ref, inputRef)}
        type={visible ? "text" : "password"}
      />
    </InputGroup>
  )
})

const VisibilityTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function VisibilityTrigger(props, ref) {
    return (
      <IconButton
        className={MergeClassnames(styles.passwordToggle, props.className)}
        ref={ref}
        aspectRatio="square"
        variant={"ghost"}
        {...props}
      />
    )
  },
)

interface PasswordStrengthMeterProps extends StackProps {
  max?: number
  value: number
}

export const PasswordStrengthMeter = React.forwardRef<
  HTMLDivElement,
  PasswordStrengthMeterProps
>(function PasswordStrengthMeter(props, ref) {
  const { max = 4, value, ...rest } = props

  const percent = (value / max) * 100
  const { label, colorPalette } = getColorPalette(percent)

  return (
    <Stack align="flex-end" gap="1" ref={ref} {...rest}>
      <HStack width="full" ref={ref} {...rest}>
        {Array.from({ length: max }).map((_, index) => (
          <Box
            key={index}
            height="1"
            data-selected={index < value ? "" : undefined}
            
          />
        ))}
      </HStack>
      {label && <HStack textStyle="xs">{label}</HStack>}
    </Stack>
  )
})

function getColorPalette(percent: number) {
  switch (true) {
    case percent < 33:
      return { label: "Low", colorPalette: "red" }
    case percent < 66:
      return { label: "Medium", colorPalette: "orange" }
    default:
      return { label: "High", colorPalette: "green" }
  }
}
