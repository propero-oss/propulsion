import { TFunction } from "@/types";

export type MethodDescriptor<FN extends TFunction> = TypedPropertyDescriptor<FN>;
