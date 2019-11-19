import { RequestHandler } from 'express';
import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';

export const use = (middleware: RequestHandler) => (
    target: any,
    key: string,
    desc: PropertyDescriptor,
): void => {
    const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];
    Reflect.defineMetadata(
        MetadataKeys.middleware,
        [...middlewares, middleware],
        target,
        key,
    );
};
