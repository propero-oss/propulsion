import {REQUEST_HANDLER} from "@/meta";
import {normalizeOptions} from "@/processor/options/normalize-options";
import {HandlerOptions, NextFunction, Request, Response} from "@/types";
import "reflect-metadata";
import {TFunction} from "@propero/propulsion-core";




export function RequestHandler(options?: string | HandlerOptions) {
  if (!options) options = {};
  if (typeof options === "string")
    options = { path: options };

  const normalized = normalizeOptions(options);
  const {headers, method} = normalized;


  return function(target: any, key: string | symbol, desc: TypedPropertyDescriptor<TFunction>) {
    Reflect.defineMetadata(REQUEST_HANDLER, {options, normalized}, target, key);

    const {value: orig} = desc;

    desc.value = function(this: typeof target, req: Request, res: Response, next: NextFunction) {
      if (method && !method(req))
        return next();

      if (headers && !headers(req.headers))
        return next();

      return orig!.apply(this, arguments as any);
    };

    return desc;
  };
}


