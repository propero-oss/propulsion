import {MiddlewareFunction} from "@/express";

export function joinMiddleware(...middlewares: MiddlewareFunction[]): MiddlewareFunction {
  return middlewares.reduce((first, second) => (req, res, next) => {
    first(req, res, err => err ? next(err) : second(req, res, next));
  });
}

export function joinMiddlewarePreserveThis(...middlewares: MiddlewareFunction[]): MiddlewareFunction {
  return function(req, res, next) {
    return middlewares.map(one => one.bind(this)).reduce((first, second) => (req, res, next) => {
      first(req, res, err => err ? next(err) : second(req, res, next));
    })(req, res, next);
  }
}
