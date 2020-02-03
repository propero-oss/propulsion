import { RepositoryError } from "@/repository/error/repository-error";

export class UnsupportedOperation extends RepositoryError {
  constructor(message = "Unsupported Operation") {
    super(message);
  }
}
