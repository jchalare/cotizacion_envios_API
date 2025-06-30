import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export const bcryptAdapter = {
  hashPassword: (password: string) => {
    const salt = genSaltSync();
    return hashSync(password, salt);
  },

  comparePassword: (password: string, hash: string) => {
    return compareSync(password, hash);
  },
};
