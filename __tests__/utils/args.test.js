import parse, { validateArgs, MESSAGES } from "../../src/utils/args";

const dados = {
  username: "admin",
  password: "admin",
  operation: "operacao",
  data: { uid: "57b61db2-4040-40da-91a5-f28c8ae15f81" },
};

it("Faz o parse dos argumentos da CLI", () => {
  const argumentos = [
    "/usr/bin/node",
    "/home/tonhao/.nvm/versions/node/v14.16.0/bin/jsassertivo",
    "--username=admin",
    "--password=admin",
    "--operation=operacao",
    '--data={"uid": "57b61db2-4040-40da-91a5-f28c8ae15f81"}',
  ];

  const retorno = parse(argumentos);

  expect(retorno).toEqual(dados);
});

describe("Validação dos argumentos da CLI", () => {
  it("Valida com sucesso os campos informados", () => {
    const campos = ["username", "password", "operation", "data"];

    expect(validateArgs(dados, campos).valid).toEqual(true);
    expect(validateArgs(dados).valid).toEqual(true);
  });

  it("Valida os cenários de erro e retorna uma mensagem", () => {
    expect(validateArgs()).toEqual({
      valid: false,
      message: expect.any(String),
    });

    expect(validateArgs(dados, ["email"])).toEqual({
      valid: false,
      message: expect.any(String),
    });
  });
});

describe("Validação das mensagens de feedback", () => {
  it("Deve retornar uma mensagem para argumentos incorretos", () => {
    const esperado = "Você precisa fornecer os argumentos corretos para a CLI";

    expect(MESSAGES.missingArgs()).toEqual(esperado);
  });

  it("Deve retornar uma mensagem para um argumento faltante", () => {
    const esperado = "Você precisa informar o argumento email";

    expect(MESSAGES.missingArg("email")).toEqual(esperado);
  });
});
