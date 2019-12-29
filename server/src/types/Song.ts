import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export default class Song {
  @Field(type => ID)
  id!: string;

  @Field()
  title!: string;

  // MORE FIELDS FOR SONG

  @Field()
  created!: string;

  @Field({ nullable: true })
  lastUpdated!: string;
}
