import {TFunction} from "@/types";



export interface MethodDescriptor<FN extends TFunction = typeof Function> extends TypedPropertyDescriptor<FN> {}
