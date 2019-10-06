import {getRestApp, createControllerRouter} from "@/express";
import {CONTROLLER} from "@/meta";
import {HandlerOptions} from "@/types";
import "reflect-metadata";


export function Controller(options: string | HandlerOptions) {
  if (typeof options == "string")
    options = { path: options || "/" };

  return function (target: any) {
    Reflect.defineMetadata(CONTROLLER, options, target);
    getRestApp().use((options as HandlerOptions).path!, createControllerRouter(target, options as HandlerOptions, new target()));
    return target;
  }
}
