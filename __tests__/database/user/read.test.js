import { getUserByUsernameAndPassword, MESSAGES } from "database/user/read.js";
import { loadDatabase } from "database/file";
import ROLES from "constants/roles";

jest.mock("database/file.js");
jest.mock("database/path.js");

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

describe("Check if user is store in database with username and password", () => {
  it("Should check username and pass and return user", async () => {
    const returnedUser = await getUserByUsernameAndPassword(
      usuario.userName,
      usuario.password
    );

    expect(returnedUser).toEqual(usuario);
  });

  it("Should throw error if user or password is incorrect", async () => {
    await expect(getUserByUsernameAndPassword("john", "doe")).rejects.toThrow(
      Error(MESSAGES.getUserByUsernameAndPassword)
    );
  });
});
