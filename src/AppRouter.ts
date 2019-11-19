import { Router } from 'express';

export class AppRouter {
    private static singleton: Router;

    static get instance(): Router {
        if (!AppRouter.singleton) {
            AppRouter.singleton = Router();
        }
        return AppRouter.singleton;
    }
}
