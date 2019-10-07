import {RequestBody, RequestHandler} from "@/decorators";
import {Controller} from "@/decorators/controller";
import {getRestApp} from "@/express";
import {NextFunction, Request, Response} from "@/types";

import express from "express";

@Controller("/api")
export class SomeController {

  @RequestHandler({path: "/me1", method: "GET"})
  private getUserInfo(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    res.json({ hello: "world" });
  }

  @RequestHandler({
    path: "/me2",
    headers: {
      contentType: "application/json"
    },
    method: "PUT"
  })
  @RequestBody("json")
  private updateUserInfo(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    res.json({ hello: "world" });
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

getRestApp().listen(3000, () => console.log(`http://localhost:3000/`));