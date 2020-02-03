import { Request } from "@/types";
import { StandardHttpMethod, StandardHttpMethodNames } from "@/types/methods/standard-http-methods";
export * from "@/types/methods/standard-http-methods";

export type RequestMethod = StandardHttpMethod | StandardHttpMethodNames;
export type RequestMethods = RequestMethod | RequestMethod[] | Record<RequestMethod, boolean>;
export type MethodCondition = (req: Request) => boolean;
