import {FunctionBuilder} from "@propero/propulsion-core";

export type CommonRequestHeaderName = CommonRequestHeaderMapType[keyof CommonRequestHeaderMapType];
export type CommonRequestHeaderNameShort = keyof CommonRequestHeaderMapType;
export type CommonRequestHeaderMapType = typeof CommonRequestHeaderMap;
export const CommonRequestHeaderMap = {
  upgradeInsecureRequests: "Upgrade-Insecure-Requests",
  xRequestedWith: "X-Requested-With",
  dnt: "DNT",
  xForwardedFor: "X-Forwarded-For",
  xForwardedHost: "X-Forwarded-Host",
  xForwardedProto: "X-Forwarded-Proto",
  frontEndHttps: "Front-End-Https",
  xHttpMethodOverride: "X-Http-Method-Override",
  xAttDeviceId: "X-ATT-DeviceId",
  xWapProfile: "X-Wap-Profile",
  proxyConnection: "Proxy-Connection",
  xUidh: "X-UIDH",
  xCsrfToken: "X-Csrf-Token",
  xRequestId: "X-Request-ID",
  xCorrelationId: "X-Correlation-ID",
  saveData: "Save-Data"
};

export type StandardRequestHeaderName = StandardRequestHeaderMapType[keyof StandardRequestHeaderMapType];
export type StandardRequestHeaderNameShort = keyof StandardRequestHeaderMapType;
export type StandardRequestHeaderMapType = typeof StandardRequestHeaderMap;
export const StandardRequestHeaderMap = {
  aIm: "A-IM",
  accept: "Accept",
  acceptCharset: "Accept-Charset",
  acceptDatetime: "Accept-Datetime",
  acceptEncoding: "Accept-Encoding",
  acceptLanguage: "Accept-Language",
  accessControlRequestMethod: "Access-Control-Request-Method",
  accessControlRequestHeaders: "Access-Control-Request-Headers",
  authorization: "Authorization",
  cacheControl: "Cache-Control",
  connection: "Connection",
  contentLength: "Content-Length",
  contentMd5: "Content-MD5",
  contentType: "Content-Type",
  cookie: "Cookie",
  date: "Date",
  expect: "Expect",
  forwarded: "Forwarded",
  from: "From",
  host: "Host",
  http2Settings: "HTTP2-Settings",
  ifMatch: "If-Match",
  ifModifiedSince: "If-Modified-Since",
  ifNoneMatch: "If-None-Match",
  ifRange: "If-Range",
  ifUnmodifiedSince: "If-Unmodified-Since",
  maxForwards: "Max-Forwards",
  origin: "Origin",
  pragma: "Pragma",
  proxyAuthorization: "Proxy-Authorization",
  range: "Range",
  referer: "Referer",
  te: "TE",
  trailer: "Trailer",
  transferEncoding: "Transfer-Encoding",
  userAgent: "User-Agent",
  upgrade: "Upgrade",
  via: "Via",
  warning: "Warning"
};

export type CustomRequestHeaderName = string;

export type RequestHeaderKey = StandardRequestHeaderName | StandardRequestHeaderNameShort
  | CommonRequestHeaderName | CommonRequestHeaderNameShort
  | CustomRequestHeaderName;

export type RequestHeaderValue = string | string[] | number | number[] | boolean | RequestHeaderValueCondition;
export type RequestHeaderCondition = (headers: Record<RequestHeaderKey, string>) => boolean;
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

/**
 * A function normalizing shorthand request header names in a request
 * header condition object to their respective long and correct versions.
 * @param map The map to normalize
 */
export function normalizeRequestHeaders(map: RequestHeaders): RequestHeaders {
  if (typeof map == "function") return map;
  return Object.entries(map).map(([key, value]) => {
    if (key in StandardRequestHeaderMap)
      // @ts-ignore
      key = StandardRequestHeaderMap[key];
    else if (key in CommonRequestHeaderMap)
      // @ts-ignore
      key = CommonRequestHeaderMap[key];
    return [key, value];
  }).reduce((all, [key, value]) => {
    // @ts-ignore
    all[key] = value;
    return all;
  }, {} as RequestHeaders);
}

export function optimizeRequestHeaders(map: RequestHeaders): RequestHeaderCondition {
  if (typeof map == "function") return map;

  const args: RequestHeaderValueCondition[] = [];

  let b = new FunctionBuilder().arg<Record<RequestHeaderKey, RequestHeaderValue>>("headers");

  Object.entries(map).forEach(([key, value]) => {
    const keyStr = JSON.stringify(key);
    const valStr = JSON.stringify(value);
    if (typeof value === "boolean")
      b.body(value ? `if (!(${keyStr} in headers)) return false` : `if (${keyStr} in headers) return false`);
    else if (typeof value == "string" || typeof value == "number")
      b.body(`if (!(${keyStr} in headers) || (headers[${keyStr}].trim() !== ${valStr})) return false`);
    else if (typeof value == "function") {
      b.arg<RequestHeaderValueCondition>(`f${args.length}`);
      b.body(`if (!(${keyStr} in headers) || !f${args.length}(headers[${keyStr})) return false`);
      args.push(value);
    } else {
      b.body(`if (!(${keyStr} in headers) || !${valStr}.contains(headers[${keyStr}].trim()) return false`);
    }
  });
  b.body("return true");

  const fn = b.build<boolean>();

  return (headers => fn(headers, ...args));
}
