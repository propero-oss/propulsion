import {UserRepo} from "@/repo/user-repo";
import {Inject} from "@propero/propulsion-core";
import {RequestHandler, Controller, RequestBody, Request, Response, NextFunction, getRestApp} from "@propero/propulsion-rest";




@Controller("/api")
export class SomeController {

  @Inject()
  private repo!: UserRepo;

  @RequestHandler({path: "/me", method: "GET"})
  private async getUserInfo(req: Request, res: Response, next: NextFunction) {
    res.json(await this.repo.getMe());
  }

  @RequestHandler({
    path: "/me",
    headers: {
      contentType: "application/json"
    },
    method: "PUT"
  })
  @RequestBody("json")
  private async updateUserInfo(req: Request, res: Response, next: NextFunction) {
    await this.repo.setMe(req.body);
    res.json(await this.repo.getMe());
  }
}

getRestApp().listen(3000, () => console.log(`https://localhost:3000/`));
