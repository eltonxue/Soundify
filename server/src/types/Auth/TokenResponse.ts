import { ObjectType, Field } from "type-graphql";

import { FieldError } from "../../types";

@ObjectType()
export default class TokenResponse {
  @Field({ nullable: true })
  accessToken?: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
