import { RepositoryError } from "@/repository/error/repository-error";

export class NoSuchElement extends RepositoryError {
  constructor(message = "No Such Element") {
    super(message);
  }
}
