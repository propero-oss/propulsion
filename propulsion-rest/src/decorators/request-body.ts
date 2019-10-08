import {joinMiddleware, MiddlewareFunction} from "@/express";
import {getParser} from "@/parser";
import {Request, Response, NextFunction, BodyParser} from "@/types";


export function RequestBody(parser: string | BodyParser) {
  const parse: BodyParser = typeof parser == "string" ? getParser(parser) : parser;

  return function(target: any, key: string | symbol, desc: TypedPropertyDescriptor<MiddlewareFunction>) {
    const { value: orig } = desc;

    desc.value = function(req, res, next) {
      return joinMiddleware(parse, orig!.bind(this))(req, res, next);
    };

    return desc;
  }
}
