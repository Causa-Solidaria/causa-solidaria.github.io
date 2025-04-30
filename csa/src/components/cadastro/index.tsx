import { CadastroLabel, Form_cadastro } from "./styled"


const Formulario_cadastro = () =>{
    return (
        <Form_cadastro>
            <CadastroLabel htmlFor="name">
                nome completo:<br />
                <input type="name" name="name" id="name"></input> <br />
            </CadastroLabel>

            <CadastroLabel htmlFor="username">
                nome de usuario:<br />
                <input type="name" name="name" id="name"></input>
            </CadastroLabel>
        </Form_cadastro>
    )
}

export {Formulario_cadastro}