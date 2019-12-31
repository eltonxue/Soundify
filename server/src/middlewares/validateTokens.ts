import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { User } from "../entities";
import { createTokens } from "../helpers/jwt";

import RequestWithUser from "../interfaces/RequestWithUser";
import { UserResponse } from "../types";

export const validateTokens = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers["x-access-token"] as string;
  const refreshToken = req.headers["x-refresh-token"] as string;

  // If neither tokens exist, we want to skip this middleware
  if (!accessToken && !refreshToken) {
    return next();
  }

  // If accessToken decoded accessToken, we want to attach the user to the request object

  const decodedAccessToken: UserResponse = (await verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET as string
  )) as UserResponse;

  if (decodedAccessToken && decodedAccessToken.user) {
    req.user = decodedAccessToken.user;
    return next();
  }

  const decodedRefreshToken: UserResponse = (await verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string
  )) as UserResponse;
  if (decodedRefreshToken && decodedRefreshToken.user) {
    const user = await User.findOne({ id: decodedRefreshToken.user.id });

    if (!user) {
      return next();
    }
    req.user = decodedRefreshToken.user;

    // Create new tokens
    const userTokens = createTokens(user);
    res.set({
      "Access-Control-Expose-Headers": "x-access-token,x-refresh-token",
      "x-access-token": userTokens.accessToken,
      "x-refresh-token": userTokens.refreshToken
    });
    return next();
  }

  next();
};
