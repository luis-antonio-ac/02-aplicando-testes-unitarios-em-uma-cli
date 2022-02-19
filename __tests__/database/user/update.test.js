import { updateUserByUid, errorMessage } from "database/user/update.js";
import { loadDatabase, saveDatabase } from "database/file";

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock("database/file.js");
jest.mock("database/path.js");

const user = {
  uid: "abc-1234",
};

describe("Database: update", () => {
  it("should update the user", async () => {
    loadDatabase.mockResolvedValue([user]);

    const userUpdated = await updateUserByUid(user);

    expect(userUpdated).toEqual(user);
    expect(loadDatabase).toHaveBeenCalledTimes(1);
    expect(saveDatabase).toHaveBeenCalledTimes(1);
    expect(saveDatabase).toBeCalledWith([user]);
  });

  it("Should throw an error because the user is not store in the database", async () => {
    loadDatabase.mockResolvedValue([]);

    await expect(() => updateUserByUid(user)).rejects.toThrow(
      errorMessage(user.uid)
    );
    expect(loadDatabase).toHaveBeenCalledTimes(1);
    expect(saveDatabase).toHaveBeenCalledTimes(0);
  });
});
