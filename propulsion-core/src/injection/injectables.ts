import { getId } from "@/injection/id";
import { InjectableProperties } from "@/injection/injectable-properties";
import { Constructor, NoArgsConstructor, NoArgsFunction, SingleArgFunction } from "@/types";

export class InjectableRegistry {
  private injectables: Record<any, InjectableProperties> = {};
  private instances = new WeakMap<Constructor<any, any>, any>();

  public createGetter(target: any, key: string | symbol, dep: any) {
    const { passInstance } = this.getInjectableMeta(dep);
    return this.createLazyPropertyGetter(target, key, this.createFactory(dep), passInstance);
  }

  public getInjectable(dep: any, instance?: any) {
    const { passInstance } = this.getInjectableMeta(dep);
    if (passInstance && !instance) throw new Error(`Cannot instantiate injectable, injectable needs an instance argument.`);
    return passInstance ? (this.createFactory(dep) as SingleArgFunction)(instance) : (this.createFactory(dep) as NoArgsFunction)();
  }

  public createFactory(dep: any): NoArgsFunction | SingleArgFunction {
    const { factory, cls, instance, multiInstance, id } = this.getInjectableMeta(dep);

    if (instance) return () => instance;

    if (cls && multiInstance) return () => new cls();

    if (cls) return () => this.instanciate(cls);

    if (factory) return factory;

    throw new Error(`No injection schema defined for injectable ${String(dep)} (id: ${String(id)})`);
  }

  public createLazyPropertyGetter(
    target: any,
    key: string | symbol,
    factory: NoArgsFunction | SingleArgFunction,
    passInstance?: boolean
  ): NoArgsFunction {
    return function(this: typeof target) {
      if (this === target || (this.constructor && this.constructor.prototype === this))
        throw Error(`Cannot access injectable getters on prototypes`);

      const instance = passInstance ? (factory as SingleArgFunction)(this) : (factory as NoArgsFunction)();

      Object.defineProperty(this, key, {
        get() {
          return instance;
        }
      });

      return instance;
    };
  }

  public instanciate(cls: NoArgsConstructor) {
    if (this.instances.has(cls)) return this.instances.get(cls)!;
    const instance = new cls();
    this.instances.set(cls, instance);
    return instance;
  }

  public hasInjectable(id: symbol) {
    return !!this.injectables[id as any];
  }

  public getInjectableMeta(dep: any) {
    const id = getId(dep);

    if (!this.hasInjectable(id)) throw new Error(`No injectable registered for ${String(dep)} (id: ${String(id)})`);

    return this.injectables[id as any];
  }

  public register(id: symbol, injectable: InjectableProperties) {
    this.injectables[id as any] = injectable;
  }
}

export const Injectables = new InjectableRegistry();
