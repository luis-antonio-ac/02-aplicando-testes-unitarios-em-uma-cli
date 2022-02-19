import { removeUser, errorMessage } from "database/user/remove.js";
import { loadDatabase, saveDatabase } from "database/file";

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock("database/file.js");
jest.mock("database/path.js");

const user = {
  uid: "abc-1234",
};

describe("Database: remove", () => {
  it("should delete the user", async () => {
    loadDatabase.mockResolvedValue([user]);

    const userDeleted = await removeUser(user.uid);

    expect(userDeleted).toEqual(user);
    expect(loadDatabase).toHaveBeenCalledTimes(1);
    expect(saveDatabase).toHaveBeenCalledTimes(1);
    expect(saveDatabase).toBeCalledWith([]);
  });

  it("Should throw an error because the user is not store in the database", async () => {
    loadDatabase.mockResolvedValue([]);

    await expect(() => removeUser(user.uid)).rejects.toThrow(
      errorMessage(user.uid)
    );
    expect(loadDatabase).toHaveBeenCalledTimes(1);
    expect(saveDatabase).toHaveBeenCalledTimes(0);
  });
});
