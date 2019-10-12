import {REQUEST_HANDLER, ROUTER} from "@/meta";
import {HandlerOptions} from "@/types";
import {Router} from "express";
import "reflect-metadata";

export function createControllerRouter(cls: any, options: HandlerOptions, instance: any): Router {
  if (Reflect.getMetadata(ROUTER, cls))
    return Reflect.getMetadata(ROUTER, cls) as Router;

  const router = Router();
  const {prototype} = cls;
  const handlerNames = Object.getOwnPropertyNames(prototype)
    .filter(key => key !== "constructor")
    .filter(key => Reflect.hasMetadata(REQUEST_HANDLER, prototype, key));

  handlerNames.forEach(name => {
    const {normalized} = Reflect.getMetadata(REQUEST_HANDLER, prototype, name);
    router.all(normalized.path, instance[name].bind(instance));
  });

  return router;
}
