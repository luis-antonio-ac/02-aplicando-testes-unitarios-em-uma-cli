import { loadDatabase, saveDatabase } from '../file.js';

export const errorMessage = uid => `Usuário com UID ${uid} não existe`

export const removeUser = async uid => {
  const users = await loadDatabase();
  const user = users.find(user => user.uid === uid);

  if (!user) {
    throw new Error(errorMessage(uid));
  }

  const filtered = users.filter(usr => usr.uid !== user.uid);
  await saveDatabase(filtered);

  return user;
}
