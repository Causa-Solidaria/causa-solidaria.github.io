

// Importações dos componentes auxiliares e tipos
import { Field } from "@chakra-ui/react";
import { FormFieldComponentProps } from "./utils";
import LabelField from "./LabelField";
import PasswordField from "./PasswordField";
import CheckboxField from "./CheckboxField";
import InputField from "./InputField";

// Componente principal responsável por orquestrar a renderização dos campos de formulário.
// Ele decide qual tipo de campo exibir (label, senha, checkbox, input padrão ou customizado)
// com base nas propriedades recebidas via props.

export default function FormFieldComponent({ item, errors, register, props }: FormFieldComponentProps) {
    return (

        // Field.Root controla o estado de erro do campo
        <Field.Root invalid={!!errors[item.register]}>
            
            {/* Se houver um elemento customizado, renderiza ele diretamente */}
            {item.customElement ? (
                item.customElement
            
            ) : (
                <>
                    {/* Renderiza o label, exceto para checkbox */}
                    {!item.ischeckbox && (
                        <LabelField label={item.label}  />
                    )}

                    {/* Renderiza campo de senha, checkbox ou input padrão conforme configuração */}
                    {item.ispassword ? (
                        <PasswordField item={item} register={register} />
                    
                    ) : item.ischeckbox ? (
                        <CheckboxField item={item} register={register} />

                    ) : (
                        <InputField item={item} register={register} props={props} />
                    )}
                </>
            )}
            {/* Exibe mensagem de erro, se houver */}
            <Field.ErrorText>
                {errors[item.register]?.message as string}
            </Field.ErrorText>
        </Field.Root>
    );
}
