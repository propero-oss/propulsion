import {BodyParser} from "@/types";

const registry: Record<string, BodyParser> = {};

export const getParserRegistry = () => registry;
export const getParser = (name: string) => registry[name];
export const registerParser = (name: string, parser: BodyParser) => registry[name] = parser;
