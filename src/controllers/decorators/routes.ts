import 'reflect-metadata';
import { RequestHandler } from 'express';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

interface RouteHandleDescriptor extends PropertyDescriptor {
    value?: RequestHandler;
}

const routeBinder = (method: string) => (path: string) => (
    target: any,
    key: string,
    desc: RouteHandleDescriptor,
): void => {
    Reflect.defineMetadata(MetadataKeys.path, path, target, key);
    Reflect.defineMetadata(MetadataKeys.method, method, target, key);
};

export const get = routeBinder(Methods.get);
export const put = routeBinder(Methods.put);
export const post = routeBinder(Methods.post);
export const del = routeBinder(Methods.del);
