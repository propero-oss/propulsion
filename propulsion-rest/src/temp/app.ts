import {RequestBody, RequestHandler} from "@/decorators";
import {Controller} from "@/decorators/controller";
import {getRestApp} from "@/express";
import {NextFunction, Request, Response} from "@/types";

@Controller("/api")
export class SomeController {

  private me: any = {
    hello: "world"
  };

  @RequestHandler({path: "/me", method: "GET"})
  private getUserInfo(req: Request, res: Response, next: NextFunction) {
    res.json(this.me);
  }

  @RequestHandler({
    path: "/me",
    headers: {
      contentType: "application/json"
    },
    method: "PUT"
  })
  @RequestBody("json")
  private updateUserInfo(req: Request, res: Response, next: NextFunction) {
    this.me = req.body;
    res.json(this.me);
  }

  @RequestHandler({
    path: "/me3",
    headers: {
      contentType: "application/json"
    },
    method: ["POST", "delete"]
  })
  private updateUserInfo2(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    res.json({ hello: "world" });
  }

  @RequestHandler({
    path: "/me4",
    headers: {
      contentType: "application/json"
    },
    method: {
      put: true,
      post: false,
      get: true,
      options: true
    }
  })
  private updateUserInfo3(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    res.json({ hello: "world" });
  }
}

getRestApp().listen(3000, () => console.log(`https://localhost:3000/`));
