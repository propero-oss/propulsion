import {getId, Injectables} from "@/injection";

export function Injectable(id?: any) {
  return function(target: any) {

    if (!id)
      id = getId(target);
    else if (typeof id !== "symbol")
      id = getId(id);

    Injectables.register(id, {
      cls: target,
      id,
    });

    return target;
  };
}

export function MultiInjectable(id?: any) {
  return function(target: any) {

    if (!id)
      id = getId(target);
    else if (typeof id !== "symbol")
      id = getId(id);

    Injectables.register(id, {
      cls: target,
      id,
      multiInstance: true
    });

    return target;
  };
}

