import {FIELD, FIELDS} from "@/meta";
import {Constructor, NoArgsConstructor} from "@/types";
import {Relation} from "@/document/meta/relation";

export type FieldMeta = {
  type?: Constructor<any>;
  meta?: {
    title?: string;
    desc?: string;
  },
  relation?: Relation<any, any>;
};

export function Field(data?: FieldMeta, scope: string = "main") {
  return function<T extends InstanceType<NoArgsConstructor> = any>(target: T, key: string | symbol) {
    const newData: FieldMeta = {...data};
    const type = Reflect.getMetadata("design:type", target, key);
    if (type != null && newData.type == null)
      newData.type = type;
    pushFieldDef(target.constructor, key);
    if (!Reflect.hasMetadata(FIELD, target, key))
      Reflect.defineMetadata(FIELD, {[scope]: newData}, target, key);
    else
      Reflect.getMetadata(FIELD, target, key)[scope] = newData;
  };
}

export function pushFieldDef(target: NoArgsConstructor, key: string | symbol, scope: string = "main") {
  if (!Reflect.hasMetadata(FIELDS, target))
    Reflect.defineMetadata(FIELDS, {}, target);
  const meta = Reflect.getMetadata(FIELDS, target);
  if (!meta[scope])
    meta[scope] = [key];
  else
    meta[scope].push(key);
}

