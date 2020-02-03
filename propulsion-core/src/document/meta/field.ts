import { FIELD, FIELDS } from "@/meta";
import { Constructor, NoArgsConstructor } from "@/types";

export interface FieldMeta {
  type?: Constructor<any>;
  meta?: {
    title?: string;
    desc?: string;
  };
}

export function pushFieldDef(target: NoArgsConstructor, key: string | symbol, scope = "main") {
  if (!Reflect.hasMetadata(FIELDS, target)) Reflect.defineMetadata(FIELDS, {}, target);
  const meta = Reflect.getMetadata(FIELDS, target);
  if (!meta[scope]) meta[scope] = [key];
  else meta[scope].push(key);
}

export function Field(data?: FieldMeta, scope = "main") {
  return function(target: InstanceType<NoArgsConstructor>, key: string | symbol) {
    const newData: FieldMeta = { ...data };
    const type = Reflect.getMetadata("design:type", target, key);
    if (type != null && newData.type == null) newData.type = type;
    pushFieldDef(target.constructor, key);
    if (!Reflect.hasMetadata(FIELD, target, key)) Reflect.defineMetadata(FIELD, { [scope]: newData }, target, key);
    else Reflect.getMetadata(FIELD, target, key)[scope] = newData;
  };
}
