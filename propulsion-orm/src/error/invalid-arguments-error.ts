import { PropulsionOrmError } from "@/error/propulsion-orm-error";

export class InvalidArgumentsError extends PropulsionOrmError {
  constructor(message = "Invalid Arguments") {
    super(message);
  }
}
