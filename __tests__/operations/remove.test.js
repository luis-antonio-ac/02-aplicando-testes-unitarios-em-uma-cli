import { remove } from "operations/remove.js";
import { removeUser } from "database/user/remove.js";

import logger from "utils/logger";

const spyLog = jest.spyOn(logger, "success").mockImplementation();
const spyError = jest.spyOn(logger, "error").mockImplementation();

const mockedUser = {
  uid: "abc-123",
  email: "email@gmail.com",
  password: "password@123",
  userName: "tonhao_tsx",
  name: "luis",
  lastName: "Santiago",
};

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock("database/path.js");
jest.mock("database/user/remove.js");

describe("operation: removeUser", () => {
  it("should delete the user", async () => {
    removeUser.mockResolvedValue(mockedUser);

    await remove({ data: mockedUser });

    expect(removeUser).toBeCalledWith(mockedUser.uid);
    expect(removeUser).toHaveBeenCalledTimes(1);
    expect(spyLog).toHaveBeenCalledTimes(1);
  });

  it("should log error because not was possible remove user", async () => {
    removeUser.mockRejectedValue(
      new Error("Ocorreu um erro ao remover o usuário")
    );

    await remove({ data: mockedUser });

    expect(spyError).toHaveBeenCalledTimes(1);
    expect(removeUser).toHaveBeenCalledTimes(1);
    expect(removeUser).toHaveBeenCalledWith(mockedUser.uid);
  });
});
