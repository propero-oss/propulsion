import {Constructor} from "@/types";

export type Class<T = any, ARGS extends unknown[] = any[]> = Constructor<T, ARGS> & { name: string };
