import {NextFunction, Request, Response} from "@/types";

export type BodyParser = (req: Request, res: Response, next: NextFunction) => any;
