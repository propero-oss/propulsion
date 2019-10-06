import {MethodCondition, RequestHeaderCondition, RequestHeaders, RequestMethods} from "@/types";



export interface HandlerOptions {
  path?: string;
  headers?: RequestHeaders;
  method?: RequestMethods;
}


export interface ProcessedHandlerOptions {
  headers?: RequestHeaderCondition;
  method?: MethodCondition;
  path: string;
}
