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
