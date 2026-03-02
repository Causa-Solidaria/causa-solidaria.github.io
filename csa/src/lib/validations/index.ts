// ===== SCHEMAS COMUNS =====
export {
  emailSchema,
  passwordSchema,
  nomeSchema,
  usernameSchema,
  cepSchema,
  cnpjSchema,
  enderecoSchema,
  isMaiorDeIdade,
  isDataFutura,
  type EnderecoData,
} from "./common";

// ===== AUTENTICAÇÃO =====
export {
  loginSchema,
  cadastroSchema,
  redefinirSenhaSchema,
  type LoginData,
  type CadastroData,
  type RedefinirSenhaData,
} from "./auth";

// ===== ONG =====
export {
  criarOngSchema,
  type CriarOngData,
} from "./ong";

// ===== CAMPANHA =====
export {
  criarCampanhaSchema,
  niveisAjuda,
  type CriarCampanhaData,
  type NivelAjuda,
  doarCampanhaSchema,
  type DoarCampanhaData,
} from "./campanha";
