import {getParser} from "@/parser";
import {Request, Response, NextFunction, BodyParser} from "@/types";


export function RequestBody(parser: string | BodyParser) {
  const parse: BodyParser = typeof parser == "string" ? getParser(parser) : parser;

  return function(target: any, key: string | symbol, desc: PropertyDescriptor) {
    const { value: orig } = desc;

    desc.value = function(req: Request, res: Response, next: NextFunction) {
      try { parse(req, res, orig.bind(this, req, res, next)); }
      catch (ex) { next(ex); }
    };

    return desc;
  }
}
