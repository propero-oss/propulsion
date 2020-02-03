import {UserRepository} from "@/repo/user-repository";
import {Inject} from "@propero/propulsion-core";
import {RequestHandler, Controller, RequestBody, Request, Response, NextFunction, getRestApp} from "@propero/propulsion-rest";

const ID = "me";

@Controller("/api/users")
export class SomeController {

  @Inject()
  private repo!: UserRepository;

  @RequestHandler({path: "/", method: "GET"})
  private async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await this.repo.findAll());
    } catch (ex) {
      next(ex);
    }
  }

  @RequestHandler({path: "/count", method: "GET"})
  private async getUserCount(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await this.repo.count());
    } catch (ex) {
      next(ex);
    }
  }

  @RequestHandler({path: "/:id", method: "GET"})
  private async getUserInfo(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await this.repo.findOne(req.param("id", ID)));
    } catch (ex) {
      next(ex);
    }
  }

  @RequestHandler({
    path: "/:id",
    headers: {
      contentType: "application/json"
    },
    method: "PUT"
  })
  @RequestBody("json")
  private async updateUserInfo(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await this.repo.updateOne(req.params.id || ID as any, req.body));
    } catch (ex) {
      next(ex);
    }
  }
}

getRestApp().listen(3000, () => console.log(`https://localhost:3000/`));

type Nullish = undefined | null;
type NonNullMember<T, M extends keyof T> = {
  [K in keyof T]: K extends M ? Exclude<T[K], Nullish> : T[K];
}

function assertMemberNonNull<T, F extends keyof T>(it: T, member: F): it is NonNullMember<T, F> {
  return it[member] != null;
}

const x: NonNullMember<{
  someKey?: string;
}, "someKey"> = {};

if (assertMemberNonNull(x, "someKey")) {
  console.log(x.someKey.toLocaleString());
}
