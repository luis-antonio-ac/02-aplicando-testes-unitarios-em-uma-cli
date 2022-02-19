import { create } from "operations/create.js";
import { createUser } from "database/user/create.js";
import logger from "utils/logger";

const spyLog = jest.spyOn(logger, "log").mockImplementation();
const spyError = jest.spyOn(logger, "error").mockImplementation();

const userPayload = {
  email: "email@gmail.com",
  password: "password@123",
  userName: "tonhao_tsx",
  name: "luis",
  lastName: "Santiago",
};

jest.mock("database/path.js");
jest.mock("database/user/create.js");

afterEach(() => {
  jest.clearAllMocks();
});

describe("operation: createUser", () => {
  it("should create a user", async () => {
    await create({ data: userPayload });

    expect(createUser).toHaveBeenCalledTimes(1);
    expect(createUser).toHaveBeenCalledWith(userPayload);
    expect(spyLog).toHaveBeenCalledTimes(1);
  });

  it("should log error because not was possible create user", async () => {
    createUser.mockRejectedValue(new Error("Ocorreu um erro ao criar usuário"));

    await create({ data: userPayload });

    expect(spyError).toHaveBeenCalledTimes(1);
    expect(createUser).toHaveBeenCalledTimes(1);
    expect(createUser).toHaveBeenCalledWith(userPayload);
  });
});
