import {RepositoryError} from "@/repository/error/repository-error";



export class NoSuchElement extends RepositoryError {
  constructor(message: string = "No Such Element") {
    super(message);
  }
}
