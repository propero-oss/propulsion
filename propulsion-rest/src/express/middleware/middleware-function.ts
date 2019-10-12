import {NextFunction, Request, Response} from "@/types";
import {TFunction} from "@propero/propulsion-core";

export type MiddlewareFunction = TFunction<void, [Request, Response, NextFunction], any>;
