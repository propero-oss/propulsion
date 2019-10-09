import {FieldMeta} from "@/document";
import {DOCUMENT, FIELD, FIELDS} from "@/meta";
import {NoArgsConstructor} from "@/types";

export type DocumentMeta<T = any> = {
  fields: Record<keyof T, FieldMeta>;
  meta?: {
    title?: string;
    desc?: string;
  }
};

export function Document(data?: Omit<DocumentMeta, "fields">) {
  return function(target: NoArgsConstructor) {
    const {prototype} = target;
    const fieldNames: (string | symbol)[] = Reflect.getMetadata(FIELDS, target) || [];
    const fields: any = {};
    fieldNames.forEach(name => fields[name] = Reflect.getMetadata(FIELD, prototype, name));
    Reflect.defineMetadata(DOCUMENT, {...data, fields}, target);
    return target;
  }
}

Document.getMeta = function<T extends NoArgsConstructor>(target: T): DocumentMeta<T> {
  return Reflect.getMetadata(DOCUMENT, target);
};

Document.create = function<T extends NoArgsConstructor>(cls: T, data?: Partial<InstanceType<T>>): InstanceType<T> {
  const document = new cls();
  Object.assign(document, data);
  return document;
};
