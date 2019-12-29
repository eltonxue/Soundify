import { ObjectType, Field } from "type-graphql";

@ObjectType()
export default class AuthInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
