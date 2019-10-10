import {RepositoryError} from "@/repository/error";

export class UnsupportedOperation extends RepositoryError {
  constructor(message: string = "Unsupported Operation") {
    super(message);
  }
}
