import {registerParser} from "@/parser/registry";
import {text} from "express";

export const textParser = text({ type: "*/*" });

registerParser("text", textParser);


