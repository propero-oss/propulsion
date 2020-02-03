import { CommonRequestHeaderNameShort, CommonRequestHeaderName } from "@/types/headers/common-headers";
import { StandardRequestHeaderName, StandardRequestHeaderNameShort } from "@/types/headers/standard-headers";

export * from "@/types/headers/common-headers";
export * from "@/types/headers/standard-headers";

export type CustomRequestHeaderName = string;

export type RequestHeaderKey =
  | StandardRequestHeaderName
  | StandardRequestHeaderNameShort
  | CommonRequestHeaderName
  | CommonRequestHeaderNameShort
  | CustomRequestHeaderName;

export type RequestHeaderValue = string | string[] | number | number[] | boolean | RequestHeaderValueCondition;
export type RequestHeaderCondition = (headers: Record<RequestHeaderKey, string | string[] | undefined>) => boolean;
export type RequestHeaderValueCondition = (value: string) => boolean;

/**
 * A map of accepted request headers required for this handler
 * or a function checking against all headers. If a map is given,
 * the key defines which header is checked against and the value
 * will define what to check for.
 * If the value is a string, the header value will be checked against
 * this string, trimmed and case sensitive.
 * If the value is a string array, the header value will be checked
 * against any one of the given values.
 * Numbers function in the same way.
 * if a boolean is given, this will make sure a given header is or
 * is not present on the request.
 * a function can also ge given, it will be executed with the request
 * header value
 */
export type RequestHeaders = Record<RequestHeaderKey, RequestHeaderValue> | RequestHeaderCondition;
