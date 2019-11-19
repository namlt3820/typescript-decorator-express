import { Request, Response, RequestHandler, NextFunction } from 'express';
import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

const bodyValidators = (keys: string[]): RequestHandler => (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.body) {
        res.status(422).send('Invalid request');
        return;
    }

    for (const key of keys) {
        if (!req.body[key]) {
            res.status(422).send(`Missing property ${key}`);
            return;
        }
    }
    next();
};

export const controller = (routePrefix: string) => (target: Function): void => {
    for (const key in target.prototype) {
        const router = AppRouter.instance;
        const routeHandler = target.prototype[key];

        const path = Reflect.getMetadata(
            MetadataKeys.path,
            target.prototype,
            key,
        );

        const method: Methods = Reflect.getMetadata(
            MetadataKeys.method,
            target.prototype,
            key,
        );

        const middlewares =
            Reflect.getMetadata(
                MetadataKeys.middleware,
                target.prototype,
                key,
            ) || [];

        const requiredBodyProps =
            Reflect.getMetadata(
                MetadataKeys.validator,
                target.prototype,
                key,
            ) || [];

        const validator = bodyValidators(requiredBodyProps);

        if (path && method) {
            router[method](
                `${routePrefix}${path}`,
                ...middlewares,
                validator,
                routeHandler,
            );
        }
    }
};
