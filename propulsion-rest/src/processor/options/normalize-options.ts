import {createMethodCondition, normalizeRequestHeaders, normalizeRequestMethods, optimizeRequestHeaders} from "@/processor";
import {ProcessedHandlerOptions, HandlerOptions} from "@/types/options/handler-options";

export function normalizeOptions(options: HandlerOptions): ProcessedHandlerOptions {
  const processed: Partial<ProcessedHandlerOptions> = {};

  if (options.headers)
    processed.headers = optimizeRequestHeaders(normalizeRequestHeaders(options.headers));

  if (options.method)
    processed.method = createMethodCondition(normalizeRequestMethods(options.method));

  processed.path = options.path || "/";

  return processed as ProcessedHandlerOptions;
}
