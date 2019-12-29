import { ObjectType, Field, ID } from "type-graphql";

import Playlist from "./Playlist";

@ObjectType()
export default class User {
  @Field(type => ID)
  id!: string;

  @Field()
  email!: string;

  // @Field()
  // password?: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  playlists!: [Playlist] | [];

  @Field()
  created!: string;

  @Field()
  lastUpdated!: string;
}
