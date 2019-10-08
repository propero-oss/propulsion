import {MiddlewareFunction} from "@/express";
import {TFunction} from "@propero/propulsion-core";



export function functionToMiddleware(fn: TFunction): MiddlewareFunction {
  return async function(req, res, next) {
    try {
      const result = await fn.apply(this, [req, res, next]);
      if (result !== undefined)
        res.send(result);
      return result;
    } catch (ex) {
      next(ex);
    }
  }
}


