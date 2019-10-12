import {ExcluideKeys} from "@/types/keys";

export type ExxcludeMembers<T, M> = Pick<T, ExcludeKeys<T, M>>;
