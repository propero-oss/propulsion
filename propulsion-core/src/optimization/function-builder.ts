import { TuplePush } from "@/types";

export class FunctionBuilder<THIS = any, ARGS extends unknown[] = []> {
  private currentBody: string[] = [];
  private currentArgs: string[] = [];

  public arg<ARG>(arg: string): FunctionBuilder<THIS, TuplePush<ARGS, ARG>> {
    this.currentArgs.push(arg);
    return this as any;
  }

  public body(statement: string): this {
    this.currentBody.push(statement);
    return this;
  }

  public build<RETURN>(): (this: THIS, ...args: ARGS) => RETURN {
    return new Function(...this.currentArgs, this.currentBody.join(";")) as any;
  }
}
