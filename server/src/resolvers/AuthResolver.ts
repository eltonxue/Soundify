import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { hash, compare } from "bcrypt";

import { User } from "../entities";
import {
  UserResponse,
  RegisterInput,
  LoginInput,
  TokenResponse
} from "../types";
import { createTokens } from "../helpers/jwt";

const INVALID_LOGIN_ERROR = {
  errors: [
    {
      path: "email",
      message: "incorrect email or password"
    }
  ]
};

const EMAIL_TAKEN_ERROR = {
  errors: [
    {
      path: "email",
      message: "email already taken"
    }
  ]
};

@Resolver()
export default class AuthResolver {
  @Query(() => UserResponse)
  async me(): Promise<UserResponse> {
    // retrieve based on session
    const user = await User.findOne({ email: "eltonxue@gmail.com" });

    return { user };
  }

  @Mutation(() => TokenResponse)
  async register(
    @Arg("input") { email, password, firstName, lastName }: RegisterInput
  ): Promise<TokenResponse> {
    const hashedPassword = await hash(password, 12);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return EMAIL_TAKEN_ERROR;
    }

    const user = await User.create({
      email,
      firstName,
      lastName,
      playlists: [],
      password: hashedPassword
    }).save();

    return await createTokens(user);
  }

  @Mutation(() => TokenResponse)
  async login(
    @Arg("input") { email, password }: LoginInput
  ): Promise<TokenResponse> {
    const user = await User.findOne({ email });

    if (!user) {
      return INVALID_LOGIN_ERROR;
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      return INVALID_LOGIN_ERROR;
    }

    return await createTokens(user);
  }

  // @Mutation(() => Boolean)
  // async logout(): Promise<Boolean> {
  //   return;
  // }
}
