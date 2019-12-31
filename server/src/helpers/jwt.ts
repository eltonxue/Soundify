import { sign } from "jsonwebtoken";

import { User } from "../entities";

export const createTokens = async (user: User) => {
  const payload = Object.assign({}, user);
  const accessToken = await sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: 60 * 60 * 24 * 30 * 12 // Expires in 1 year
    }
  );
  const refreshToken = await sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: 60 * 60 // Expires in 1 hour
    }
  );

  return { accessToken, refreshToken };
};
