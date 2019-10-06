

export type StandardHttpMethod = StandardHttpMethodMapType[StandardHttpMethodNames];
export type StandardHttpMethodNames = keyof StandardHttpMethodMapType;
export type StandardHttpMethodMapType = typeof StandardHttpMethodMap;
export const StandardHttpMethodMap = {
  get: "GET",
  head: "HEAD",
  post: "POST",
  put: "PUT",
  delete: "DELETE",
  connect: "CONNECT",
  options: "OPTIONS",
  trace: "TRACE",
  patch: "PATCH"
};
