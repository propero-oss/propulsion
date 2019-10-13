import {FieldMeta} from "@/document";
import {DOCUMENT, FIELD, FIELDS} from "@/meta";
import {NoArgsConstructor} from "@/types";

export type DocumentMeta<T = any> = {
  fields: Record<keyof T, FieldMeta>;
  meta?: {
    title?: string;
    desc?: string;
  };
};

export function Document(data?: Omit<DocumentMeta, "fields">, scope: string = "main") {
  return function(target: NoArgsConstructor) {
    const {prototype} = target;
    const fieldNames: (string | symbol)[] = Reflect.getMetadata(FIELDS, target) && Reflect.getMetadata(FIELDS, target)[scope] || [];
    const fields: any = {};
    fieldNames.forEach(name => fields[name] = Reflect.getMetadata(FIELD, prototype, name)[scope]);
    if (!Reflect.hasMetadata(DOCUMENT, target))
      Reflect.defineMetadata(DOCUMENT, {}, target);
    Reflect.getMetadata(DOCUMENT, target)[scope] = {...data, fields};
    return target;
  };
}

Document.getMeta = function<T extends NoArgsConstructor>(target: T, scope: string = "main"): DocumentMeta<T> {
  return Reflect.getMetadata(DOCUMENT, target)[scope];
};

Document.create = function<T extends NoArgsConstructor>(cls: T, data?: Partial<InstanceType<T>>, scope: string = "main"): InstanceType<T> {
  const document = new cls();
  Object.assign(document, data);
  return document;
};
