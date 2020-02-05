import { PropulsionOrmError } from "@/error/propulsion-orm-error";

export class NoSuchElement extends PropulsionOrmError {
  constructor(message = "No Such Element") {
    super(message);
  }
}
