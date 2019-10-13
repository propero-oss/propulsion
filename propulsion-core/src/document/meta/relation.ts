import {NoArgsConstructor} from "@/types";

export type Relation<T, R> = OneToOneRelation<T, R> | OneToManyRelation<T, R> | ManyToOneRelation<T, R> | ManyToManyRelation<T, R>;

export interface OneToOneRelation<T, R> {
  type: "1:1";
  target: () => NoArgsConstructor<R>;
  fromField: keyof T;
  toField: keyof R;
}

export interface OneToManyRelation<T, R> {
  type: "1:n"
  target: () => NoArgsConstructor<R>;
  fromField: keyof T;
  toField: keyof R;
}

export interface ManyToOneRelation<T, R> {
  type: "n:1"
  target: () => NoArgsConstructor<R>;
  fromField: keyof T;
  toField: keyof R;
}

export interface ManyToManyRelation<T, R> {
  type: "n:n";
  origin: () => NoArgsConstructor<T>;
  target: () => NoArgsConstructor<R>;
  fromField: keyof T;
  toField: keyof R;
}
