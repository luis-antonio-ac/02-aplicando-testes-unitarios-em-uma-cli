import { update } from "operations/update.js";
import { updateUserByUid } from "database/user/update.js";

import logger from "utils/logger";

const spyLog = jest.spyOn(logger, "success").mockImplementation();
const spyError = jest.spyOn(logger, "error").mockImplementation();

const mockedUser = {
  uid: "a641591a-2f04-480f-9ee2-18027e1b34c7",
};

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock("database/path.js");
jest.mock("database/user/update.js");

describe("operation: updateUser", () => {
  it("should update the user", async () => {
    updateUserByUid.mockResolvedValue();

    await update({ data: mockedUser });

    expect(updateUserByUid).toBeCalledWith(mockedUser);
    expect(updateUserByUid).toHaveBeenCalledTimes(1);
    expect(spyLog).toHaveBeenCalledTimes(1);
  });

  it("should log error because not was possible update user", async () => {
    updateUserByUid.mockRejectedValue(
      new Error("Ocorreu um erro ao atualizar dados do usuário")
    );

    await update({ data: mockedUser });

    expect(spyError).toHaveBeenCalledTimes(1);
    expect(updateUserByUid).toHaveBeenCalledTimes(1);
    expect(updateUserByUid).toHaveBeenCalledWith(mockedUser);
  });
});
