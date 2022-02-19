import { loadDatabase, saveDatabase } from '../file.js';

export const errorMessage = uid => `Usuário com UID ${uid} não existe`

export const updateUserByUid = async ({ uid, ...information }) => {
  const users = await loadDatabase();
  const user = users.find(usr => usr.uid === uid);

  if (!user) {
    throw new Error(errorMessage(uid));
  }

  const updatedUser = {
    ...user,
    ...information
  };

  const updatedUsers = users.map(usr => usr.uid === uid ? updatedUser : usr);

  await saveDatabase(updatedUsers);

  return updatedUser;
}
