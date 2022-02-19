import { isAdmin } from "../constants/roles.js";

export const ERROR_MESSAGE =
  "Você não possui permissão para executar essa operação.";

// Valida se usuário é admin para realizar alguma ação que necessita de permissão
export const isAdminMiddleware = (data) => {
  if (!isAdmin(data.user)) {
    throw new Error(ERROR_MESSAGE);
  }

  return data;
};
