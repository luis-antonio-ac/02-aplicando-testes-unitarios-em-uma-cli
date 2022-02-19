import { read } from "operations/read.js";
import { getUserByUid } from "database/user/read.js";
import logger from "utils/logger";

const spyLog = jest.spyOn(logger, "log").mockImplementation();
const spyError = jest.spyOn(logger, "error").mockImplementation();

const userPayload = {
  uid: "a641591a-2f04-480f-9ee2-18027e1b34c7",
};

jest.mock("database/path.js");
jest.mock("database/user/read.js");

afterEach(() => {
  jest.clearAllMocks();
});

describe("operation: readUser", () => {
  it("should read a user", async () => {
    getUserByUid.mockResolvedValue(userPayload);

    await read({ data: userPayload });

    expect(getUserByUid).toBeCalledWith(userPayload.uid);
    expect(getUserByUid).toHaveBeenCalledTimes(1);
    expect(spyLog).toHaveBeenCalledTimes(1);
  });

  it("Should log error because user is not stored in the database", async () => {
    getUserByUid.mockResolvedValue();

    await read({ data: userPayload });

    expect(getUserByUid).toBeCalledWith(userPayload.uid);
    expect(getUserByUid).toHaveBeenCalledTimes(1);
    expect(spyError).toHaveBeenCalledTimes(1);
  });

  it("should log error because not was possible read user", async () => {
    getUserByUid.mockRejectedValue(
      new Error("Ocorreu um erro ao ler os dados do usuário")
    );

    await read({ data: userPayload });

    expect(spyError).toHaveBeenCalledTimes(1);
    expect(getUserByUid).toHaveBeenCalledTimes(1);
    expect(getUserByUid).toHaveBeenCalledWith(userPayload.uid);
  });
});
