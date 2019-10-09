import {FIELD, FIELDS} from "@/meta";
import {Constructor, NoArgsConstructor} from "@/types";

export type FieldMeta = {
  type?: Constructor<any>;
  meta?: {
    title?: string;
    desc?: string;
  }
};

export function Field(data?: FieldMeta) {
  return function(target: InstanceType<NoArgsConstructor>, key: string | symbol) {
    const newData: FieldMeta = {...data};
    const type = Reflect.getMetadata("design:type", target, key);
    if (type != null && newData.type == null)
      newData.type = type;
    pushFieldDef(target.constructor, key);
    Reflect.defineMetadata(FIELD, newData, target, key);
  }
}

export function pushFieldDef(target: NoArgsConstructor, key: string | symbol) {
  if (!Reflect.hasMetadata(FIELDS, target))
    Reflect.defineMetadata(FIELDS, [], target);
  return Reflect.getMetadata(FIELDS, target).push(key);
}

