import "reflect-metadata";
import { Injectables } from "@/injection/injectables";

export function Inject(dep?: any) {
  return function(target: any, key: string | symbol) {
    if (!dep) dep = Reflect.getMetadata("design:type", target, key);

    if (!dep) throw new Error(`Unknown dependency injection for property ${String(key)} in class ${(target && target.name) || String(target)}`);

    return Object.defineProperty(target, key, {
      get: Injectables.createGetter(target, key, dep)
    });
  };
}
