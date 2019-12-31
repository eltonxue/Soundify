import { InputType, Field } from "type-graphql";

@InputType()
export default class RegisterInput {
  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;
}
