import {RequestMethod, RequestMethods, StandardHttpMethodMap} from "@/types";

const toUpperCase: ((val: string) => string) = String.prototype.toUpperCase.call.bind(String.prototype.toUpperCase) as any;

export function normalizeRequestMethods(methods: RequestMethods): RequestMethod[] {
  if (methods == null) return Object.values(StandardHttpMethodMap);
  if (typeof methods == "string")
    return [methods.toUpperCase()];
  if (Array.isArray(methods))
    return methods.map(toUpperCase);
  /*
  const values: string[] = [];

  for (let key in methods)
    if (methods.hasOwnProperty(key))
      if (methods[key])
        values.push(key.toUpperCase());

  return values;
  */
  return Object.entries(methods)
    .filter(([_, value]) => value)
    .map(([key]) => toUpperCase(key))
    .reduce((all, key) => all.concat(key), [] as string[]);
}
