import {joinMiddleware} from "@/express";
import {getParser} from "@/parser";
import {BodyParser} from "@/types";
import {TFunction} from "@propero/propulsion-core";


export function RequestBody(parser: string | BodyParser) {
  const parse: BodyParser = typeof parser === "string" ? getParser(parser) : parser;

  return function(target: any, key: string | symbol, desc: TypedPropertyDescriptor<TFunction>) {
    const { value: orig } = desc;

    desc.value = function(req, res, next) {
      return joinMiddleware(parse, orig!.bind(this))(req, res, next);
    };

    return desc;
  };
}
