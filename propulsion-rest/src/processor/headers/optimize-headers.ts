import { RequestHeaderCondition, RequestHeaderKey, RequestHeaders, RequestHeaderValue, RequestHeaderValueCondition } from "@/types";
import { FunctionBuilder } from "@propero/propulsion-core";

export function optimizeRequestHeaders(map: RequestHeaders): RequestHeaderCondition {
  if (typeof map === "function") return map;

  const args: RequestHeaderValueCondition[] = [];

  const b = new FunctionBuilder().arg<Record<RequestHeaderKey, RequestHeaderValue>>("headers");

  Object.entries(map).forEach(([key, value]) => {
    const keyStr = JSON.stringify(key.toLowerCase());
    const valStr = JSON.stringify(value);
    if (typeof value === "boolean") b.body(value ? `if (!(${keyStr} in headers)) return false` : `if (${keyStr} in headers) return false`);
    else if (typeof value === "string" || typeof value === "number")
      b.body(`if (!(${keyStr} in headers) || (headers[${keyStr}].trim() !== ${valStr})) return false`);
    else if (typeof value === "function") {
      b.arg<RequestHeaderValueCondition>(`f${args.length}`);
      b.body(`if (!(${keyStr} in headers) || !f${args.length}(headers[${keyStr})) return false`);
      args.push(value);
    } else b.body(`if (!(${keyStr} in headers) || !${valStr}.contains(headers[${keyStr}].trim()) return false`);
  });
  b.body("return true");

  const fn: any = b.build<boolean>();

  return headers => fn(headers, ...args);
}
