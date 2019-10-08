import {registerParser} from "@/parser/registry";
import {raw} from "express";

export const rawParser = raw({ type: "*/*" });

registerParser("raw", rawParser);


