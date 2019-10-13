import {Document, Field, DocumentMeta, FieldMeta} from "@/document";

export class Scope<DOCUMENT_META extends DocumentMeta = DocumentMeta, FIELD_META extends FieldMeta = FieldMeta> {

  constructor(
    public readonly scope: string = "main"
  ) {}

  public Document(data?: Omit<DOCUMENT_META, "fields">) {
    return Document(data, this.scope);
  }

  public Field(data?: FIELD_META) {
    return Field(data, this.scope);
  }

}

export const Main = new Scope();
