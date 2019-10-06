import {TuplePush} from "@/types";

export class FunctionBuilder<THIS = any, ARGS extends unknown[] = []> {

  private _body: string[] = [];
  private _args: string[] = [];

  public arg<ARG>(arg: string): FunctionBuilder<THIS, TuplePush<ARGS, ARG>> {
    this._args.push(arg);
    // @ts-ignore
    return this;
  }

  public body(statement: string): this {
    this._body.push(statement);
    return this;
  }

  public build<RETURN>(): (this: THIS, ...args: ARGS) => RETURN {
    // @ts-ignore
    return new Function(...this._args, this._body.join(";"));
  }
}
