import { Resolver, Mutation, Arg } from "type-graphql";
import { User, AuthInput } from "../types";

@Resolver(User)
export default class UserResolver {
  @Mutation(() => User)
  async create(
    @Arg("input")
    { email, password }: AuthInput
  ): Promise<User> {
    // IN ORDER TO MOVE ON, I NEED TO CONNECT A DATABASE

    return {
      id: "1",
      email: "eltonxue@gmail.com",
      firstName: "Elton",
      lastName: "Xue",
      playlists: [],
      created: "yesterday",
      lastUpdated: "yesterday"
    };
  }
}
