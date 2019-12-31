import { ObjectType, Field } from "type-graphql";

import { User } from "../../entities";

import FieldError from "../Error/FieldError";

@ObjectType()
export default class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
