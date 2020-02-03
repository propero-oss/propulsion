import { registerParser } from "@/parser/registry";
import { json } from "express";

export const jsonParser = json({ type: "*/*" });

registerParser("json", jsonParser);
