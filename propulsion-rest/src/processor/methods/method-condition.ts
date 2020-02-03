import { CommonRequestHeaderMap, Request, RequestMethod } from "@/types";

const override = CommonRequestHeaderMap.xHttpMethodOverride.toLowerCase();

export function createMethodCondition(methods: RequestMethod[]) {
  return function(req: Request) {
    let { method } = req;
    if (req && req.headers && req.headers[override] && !Array.isArray(req.headers[override])) method = req.headers[override]! as string;
    return methods.indexOf(method) !== -1;
  };
}
