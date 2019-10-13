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

  @Field({
    relation: {
      type: "1:1",
      target: () => User,
      toField: "id"
    }
  })
  creator!: User;
}
