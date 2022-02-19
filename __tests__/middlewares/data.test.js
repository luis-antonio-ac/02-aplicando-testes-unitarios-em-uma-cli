import { validateDataMiddleware } from "middlewares/data.js";

const userPayload = {
  email: "email@gmail.com",
  password: "password@123",
  userName: "tonhao_tsx",
  name: "luis",
  lastName: "Santiago",
};

const campos = ["email", "password", "userName", "name", "lastName"];

const mockValidatePayload = {
  data: userPayload,
};

describe("Check if data is valid based on fields", () => {
  it("Should return userPayload", () => {
    const validatedPayload =
      validateDataMiddleware(campos)(mockValidatePayload);

    expect(validatedPayload).toEqual(mockValidatePayload);
  });

  it("Should throw a error because uid is missing", () => {
    const wrapperValidatePayload = () =>
      validateDataMiddleware(["uid"])(mockValidatePayload);

    expect(wrapperValidatePayload).toThrow();
  });
});
