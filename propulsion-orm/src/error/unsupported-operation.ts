import { PropulsionOrmError } from "@/error/propulsion-orm-error";

export class UnsupportedOperation extends PropulsionOrmError {
  constructor(message = "Unsupported Operation") {
    super(message);
  }
}
