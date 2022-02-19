import { loadDatabase } from "../file.js";

export const MESSAGES = {
  getUserByUid: "Não existe usuário com uid informado.",
  getUserByUsernameAndPassword:
    "Credenciais incorretas ou usuário inexistente.",
};

export const getUserByUid = async (uid) => {
  const data = await loadDatabase();
  const user = data.find((usr) => usr.uid === uid);

  if (!user) {
    throw new Error(MESSAGES.getUserByUid);
  }

  return user;
};

export const getUserByUsernameAndPassword = async (username, password) => {
  const data = await loadDatabase();
  const user = data.find(
    (usr) => usr.userName === username && usr.password === password
  );

  if (!user) {
    throw new Error(MESSAGES.getUserByUsernameAndPassword);
  }

  return user;
};
