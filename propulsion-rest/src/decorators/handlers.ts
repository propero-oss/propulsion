import {normalizeRequestHeaders, optimizeRequestHeaders, RequestHeaders} from "@/types/request-headers";


export type Request = any;
export type Response = any;
export type NextFunction = any;


export interface HandlerOptions {
  path?: string;
  headers?: RequestHeaders
}

export function RequestHandler(options?: string | HandlerOptions) {
  if (!options) options = {};
  if (typeof options == "string")
    options = { path: options };
  if (options.headers)
    options.headers = optimizeRequestHeaders(normalizeRequestHeaders(options.headers));

  const {headers} = options;

  return function(target: any, key: string | symbol, desc: PropertyDescriptor) {
    const {value: orig} = desc;

    desc.value = function(this: typeof target, req: Request, res: Response, next: NextFunction) {
      if (headers && !headers(req.headers)) return next();
      return orig.apply(this, arguments);
    };

    return desc;
  }
}

export class SomeController {

  @RequestHandler("/me")
  private getUserInfo(req: Request, res: Response, next: NextFunction) {
    res.send("Hi");
  }

  @RequestHandler({
    path: "/me",
    headers: {
      contentType: "application/json"
    }
  })
  private updateUserInfo(req: Request, res: Response, next: NextFunction) {

  }
}

