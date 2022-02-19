import { loadDatabase, saveDatabase } from "database/file.js";
import { promises } from "fs";
import logger from "utils/logger";

jest.mock("database/path.js");
jest.mock("fs", () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));

afterEach(() => {
  jest.clearAllMocks();
});

const spyError = jest.spyOn(logger, "error").mockImplementation();

describe("loadDatabase", () => {
  it("should return array of users", async () => {
    const arrayOfUsers = "[]";
    promises.readFile.mockResolvedValue(arrayOfUsers);

    const users = await loadDatabase();

    expect(users).toEqual(expect.arrayContaining([]));
    expect(promises.readFile).toHaveBeenCalledTimes(1);
  });

  it("should call logger error one time because cannot open database", async () => {
    const errorMessage = "Erro ao carregar dados da base";
    promises.readFile.mockRejectedValueOnce(errorMessage);

    await loadDatabase();

    expect(spyError).toHaveBeenCalledTimes(1);
  });
});

describe("saveDatabase", () => {
  it("Should store user in database", async () => {
    await saveDatabase([]);

    expect(promises.writeFile).toHaveBeenCalledTimes(1);
    expect(promises.writeFile).toHaveBeenCalledWith("mocked-path", "[]");
  });

  it("should call logger error one time because cannot save payload on database", async () => {
    promises.writeFile.mockRejectedValueOnce(String());

    await saveDatabase([]);

    expect(spyError).toHaveBeenCalledTimes(1);
  });
});
