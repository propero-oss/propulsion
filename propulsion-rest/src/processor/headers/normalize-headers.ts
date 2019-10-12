/**
 * A function normalizing shorthand request header names in a request
 * header condition object to their respective long and correct versions.
 * @param map The map to normalize
 */
import {CommonRequestHeaderMap, RequestHeaders, StandardRequestHeaderMap} from "@/types";



export function normalizeRequestHeaders(map: RequestHeaders): RequestHeaders {
  if (typeof map === "function") return map;
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
