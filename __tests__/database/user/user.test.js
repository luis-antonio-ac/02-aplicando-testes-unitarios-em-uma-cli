import { getUserByUid } from "../../../src/database/user/read";
import { loadDatabase } from "../../../src/database/file";
import ROLES from "../../../src/constants/roles";

jest.mock("../../../src/database/file.js");
jest.mock("../../../src/database/path.js");

const usuario = {
  uid: "abc-1234",
  userName: "tonhao",
  name: "Luis Antonio",
  lastName: "da Silva Sauro",
  email: "email@gmail.com",
  password: "1234",
  role: ROLES.USER,
};

loadDatabase.mockResolvedValue([usuario]);

describe("Busca de usuario pelo seu uid", () => {
  it("Deve encontrar um usuario buscado pelo uid", async () => {
    expect.assertions(1);

    const usuarioEncontrado = await getUserByUid(usuario.uid);
    expect(usuarioEncontrado).toEqual(usuario);
  });

  it("Deve devolver um erro por nao encontrar o usuario com o uid", async () => {
    expect.assertions(1);

    try {
      await getUserByUid("uid inexistente");
    } catch (error) {
      expect(error.message).toEqual("Não existe usuário com uid informado.");
    }
  });
});
