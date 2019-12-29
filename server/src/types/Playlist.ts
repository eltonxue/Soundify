import { ObjectType, Field, ID } from "type-graphql";

import Song from "./Song";

@ObjectType()
export default class Playlist {
  @Field(type => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  songs!: [Song];

  @Field()
  created!: string;

  @Field({ nullable: true })
  lastUpdated!: string;
}
