import { ExcludeKeys } from "@/types/keys";

export type ExcludeMembers<T, M> = Pick<T, ExcludeKeys<T, M>>;
