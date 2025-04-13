

import styled from "styled-components";


export default function Home() {
    const Card = styled.div`
        border-radius: 10px;
        margin: 5%;
        max-width: 40%;
        max-height: 75%;
        padding: 5%;
        justify-self: center;
        justify-content: center;
        align-items: center;
        background-color: var(--color2);
        border: 3px solid var(--foreground);
        box-shadow: 10px 10px  var(--foreground);


        form {
            width: 100%;
            gap: 10px;
            display: inline;
        }
        input {
            min-width: max-content;
            border: 3px solid var(--foreground);
            background-color: var(--color2);
            border-radius: 5px;
        }
        h1 {
            color: var(--color2-inv);
            text-align: center;
        }
    `
    const Submit = styled.input`
        background-color: var(--foreground);
        color: var(--color2-inv);
        border-radius: 5px;
        border: 3px solid var(--foreground);
        cursor: pointer;
        font-size: 1.2em;

        &:hover {
            background-color: var(--color2-inv);
            color: var(--foreground);
        }
    `

    return (
        <main>
            <Card>
                <h1>Cadastro</h1>
                <form>
                    <label htmlFor="nome">Nome:</label><br/>
                    <input type="text" id="nome" name="nome" required /><br/>
                    
                    <label htmlFor="email">Email:</label><br/>
                    <input type="email" id="email" name="email" required /><br/>
                    
                    <label htmlFor="senha">Senha:</label><br/>
                    <input type="password" id="senha" name="senha" required /><br/>
                    
                    <label htmlFor="confirmarSenha">Confirmar Senha:</label><br/>
                    <input type="password" id="confirmarSenha" name="confirmarSenha" required /><br/>
                    
                    <label htmlFor="telefone">Telefone:</label><br/>
                    <input type="tel" id="telefone" name="telefone" required /><br/>

                    <Submit type="submit" value="Cadastrar" />
                </form>
            </Card>
        </main>
    )
}