import {getId} from "@/injection/id";
import {Injectables} from "@/injection/injectables";


export interface FactoryOptions {
  constructs: any;
  multiInstance?: boolean;
  passInstance?: boolean;
}

function Factory(opts: FactoryOptions) {
  let id = opts.constructs;
  if (typeof id !== "symbol")
    id = getId(id);

  return function(target: any, key: string | symbol, desc: PropertyDescriptor) {
    Injectables.register(id, {
      id,
      factory: desc.value.bind(target),
      multiInstance: opts.multiInstance,
      passInstance: opts.passInstance
    });
    return desc;
  }
}







