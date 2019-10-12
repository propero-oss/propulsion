import {IncludeKeys} from "@/types/keys";

export type IncludeMembers<T, M> = Pick<T, IncludeKeys<T, M>>;
