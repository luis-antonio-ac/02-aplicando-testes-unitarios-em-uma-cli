import { isAdminMiddleware, ERROR_MESSAGE } from "middlewares/user.js";
import ROLES from "constants/roles.js";

const user = {
  email: "email@gmail.com",
  password: "password",
  userName: "tonhao",
  name: "tonhao da silva",
  lastName: "sauro",
};

it("Should return user if role is ADMIN", () => {
  const mockAdmin = {
    user: { ...user, role: ROLES.ADMIN },
  };

  const adminUser = isAdminMiddleware(mockAdmin);

  expect(adminUser).toEqual(mockAdmin);
});

it("Should throw a error if role is USER", () => {
  const mockUser = {
    user: { ...user, role: ROLES.USER },
  };

  const returned = () => isAdminMiddleware(mockUser);
  expect(returned).toThrow(ERROR_MESSAGE);
});
