'use client'

import { Button, Link, Box } from "@chakra-ui/react"
import { Redefinir, Cadastro } from "csa/Rotas.json"
import Logo from "csa/components/ui/logo"
import usePopup from "csa/hooks/usePopup"
import { loginSchema, type LoginData } from "csa/lib/validations"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { handleLogin } from "csa/lib/handlers"
import { Card, Flex, Heading, Input } from "csa/components/ui"
import styles from "./login.module.css"
import useNavigate from "csa/hooks/useNavigate"

/* ==================== Constants ==================== */
const FORM_FIELDS: (keyof LoginData)[] = ["email", "password"]

const FIELD_LABELS: Record<keyof LoginData, string> = {
    email: "E-mail",
    password: "Senha"
}

/* ==================== Main Component ==================== */
export default function Login() {
    const { router } = useNavigate();
    const popup = usePopup()

    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginData>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginData) => {
        await handleLogin(data, popup, router)
        reset()
    }

    return (
        <Box className={styles.page}>
            {/* ==================== Background Decoration ==================== */}
            <Box className={styles.backgroundDecoration} />

            {/* ==================== Main Card ==================== */}
            <Card className={styles.card}>
                {/* Header with Logo */}
                <Flex className={styles.header}>
                    <Logo className={styles.logo} />
                    <Heading className={styles.title}>
                        Login
                    </Heading>
                </Flex>

                {/* ==================== Form ==================== */}
                <Flex
                    as="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className={styles.form}
                >
                    {FORM_FIELDS.map((field) => (
                        <Flex key={field} className={styles.fieldGroup}>
                            <Heading as="label" className={styles.label}>
                                {FIELD_LABELS[field]}
                            </Heading>

                            <Input
                                {...register(field)}
                                type={field === "password" ? "password" : "email"}
                                placeholder={`Digite seu ${FIELD_LABELS[field].toLowerCase()}`}
                                className={`${styles.input} ${errors[field] ? styles.inputError : ''}`}
                            />

                            {errors[field] && (
                                <Heading className={styles.errorMessage}>
                                    {errors[field]?.message}
                                </Heading>
                            )}
                        </Flex>
                    ))}

                    {/* Forgot Password Link */}
                    <Flex className={styles.forgotPassword}>
                        <Heading className={styles.forgotText}>
                            Esqueceu a senha?
                        </Heading>
                        <Link href={Redefinir} className={styles.forgotLink}>
                            <Heading className={styles.forgotLinkText}>
                                clique aqui
                            </Heading>
                        </Link>
                    </Flex>

                    {/* Submit Button */}
                    <Button type="submit" className={styles.submitButton}>
                        Entrar
                    </Button>
                </Flex>

                {/* ==================== Footer - Create Account ==================== */}
                <Flex className={styles.footer}>
                    <Heading className={styles.footerText}>
                        Não tem conta?
                    </Heading>
                    <Link href={Cadastro} className={styles.footerLink}>
                        <Heading className={styles.footerLinkText}>
                            clique aqui
                        </Heading>
                    </Link>
                </Flex>
            </Card>
        </Box>
    )
}