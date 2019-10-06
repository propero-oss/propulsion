import {Controller} from "@/decorators/controller";
import {REQUEST_HANDLER} from "@/meta";
import {normalizeOptions} from "@/processors/options/normalize-options";
import {NextFunction, Request, Response} from "@/types";
import {HandlerOptions} from "@/types/options/handler-options";
import "reflect-metadata";




export function RequestHandler(options?: string | HandlerOptions) {
  if (!options) options = {};
  if (typeof options == "string")
    options = { path: options };

  const normalized = normalizeOptions(options);
  const {headers, method} = normalized;


  return function(target: any, key: string | symbol, desc: PropertyDescriptor) {
    Reflect.defineMetadata(REQUEST_HANDLER, {options, normalized}, target, key);
    
    const {value: orig} = desc;

    desc.value = function(this: typeof target, req: Request, res: Response, next: NextFunction) {
      if (method && !method(req))
        return next();

      if (headers && !headers(req.headers))
        return next();

      return orig.apply(this, arguments);
    };

    return desc;
  }
}


