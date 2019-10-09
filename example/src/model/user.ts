import {Document, Field} from "@propero/propulsion-core";



@Document({
  meta: {
    title: "User",
    desc: "A document representing a user"
  }
})
export class User {

  @Field()
  id!: string;

  @Field()
  username!: string;

  @Field()
  password!: string;

  @Field()
  email!: string;

  @Field()
  firstName?: string;
}
