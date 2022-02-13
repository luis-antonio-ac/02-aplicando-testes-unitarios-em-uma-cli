import { createUser } from "../../../src/database/user/create";
import * as file from "../../../src/database/file";
import ROLES from "../../../src/constants/roles";

jest.mock("../../../src/database/file.js");
jest.mock("../../../src/database/path.js");

const usuario = {
  email: "email@gmail.com",
  password: "password",
  userName: "tonhao",
  name: "tonhao da silva",
  lastName: "sauro",
};

beforeEach(() => {
  file.loadDatabase.mockResolvedValueOnce([]);
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.clearAllMocks();
});

describe("Criação de usuário", () => {
  it("Deve criar um usuario com a role USER", async () => {
    const usuarioCriado = await createUser(usuario);

    expect(file.loadDatabase).toHaveBeenCalledTimes(1);
    expect(file.saveDatabase).toHaveBeenCalledTimes(1);
    expect(file.saveDatabase).toHaveBeenCalledWith([usuarioCriado]);
    expect(usuarioCriado).toEqual({
      ...usuario,
      uid: expect.any(String),
      role: ROLES.USER,
    });
  });

  it("Deve criar um usuario com a role ADMIN", async () => {
    const usuarioCriado = await createUser({ ...usuario, role: ROLES.ADMIN });

    expect(file.loadDatabase).toHaveBeenCalledTimes(1);
    expect(file.saveDatabase).toHaveBeenCalledTimes(1);
    expect(file.saveDatabase).toHaveBeenCalledWith([usuarioCriado]);
    expect(usuarioCriado).toEqual({
      ...usuario,
      uid: expect.any(String),
      role: ROLES.ADMIN,
    });
  });
});
