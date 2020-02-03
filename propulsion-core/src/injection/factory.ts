import { getId } from "@/injection/id";
import { Injectables } from "@/injection/injectables";
import { Constructor, MethodDescriptor, NoArgsFunction, SingleArgFunction, TFunction } from "@/types";

export interface FactoryOptions<T = any> {
  constructs?: Constructor<T> | symbol;
  multiInstance?: boolean;
  passInstance?: boolean;
}

function registerFactory(opts: FactoryOptions, factory: SingleArgFunction | NoArgsFunction) {
  const { multiInstance, passInstance } = opts;
  let { constructs: id } = opts;
  if (id == null) throw new Error("Undefined injectable type for factory, please provide constructs option");
  if (typeof id !== "symbol") id = getId(id);
  Injectables.register(id, {
    id,
    factory,
    multiInstance,
    passInstance
  });
}

export function Factory<T = any>(opts: FactoryOptions<T> = {}) {
  return function(target: Constructor, key: string | symbol, desc: MethodDescriptor<TFunction<T>>) {
    if (!opts.constructs) opts.constructs = Reflect.getMetadata("design:returntype", target, key);
    if (typeof target !== "function") throw new Error("Factory methods must be static");
    registerFactory(opts, desc.value!.bind(target));
    return desc;
  };
}
