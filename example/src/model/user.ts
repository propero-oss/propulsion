import {Scope, Document, Field} from "@propero/propulsion-core";

const Ui = new Scope("ui");

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
  @Ui.Field({ display: false })
  password!: string;

  @Field()
  @Ui.Field({ variant: "email" })
  email!: string;

  @Field()
  firstName?: string;
}
