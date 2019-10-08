import {getId, Injectables} from "@/injection";

export function registerInstance(instance: any, id?: any) {
  if (!id)
    id = getId(instance);
  if (typeof id != "symbol")
    id = getId(id);
  Injectables.register(id, {instance});
}
