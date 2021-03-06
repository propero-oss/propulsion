import {User} from "@/model/user";
import {Injectable, MemoryMapRepository} from "@propero/propulsion-core";

@Injectable()
export class UserRepository extends MemoryMapRepository<User, "id"> {
  constructor() { super(User, "id"); }
}

