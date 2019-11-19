import { Request, Response, NextFunction } from 'express';
import { get, controller, use } from './decorators';

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Not permitted');
};

@controller('')
class RootController {
    @get('/')
    getRoot(req: Request, res: Response): void {
        if (req.session && req.session.loggedIn) {
            res.send(`
                <div>
                    <p>You're logged in</p>
                    <a href="/auth/logout">Logout</a>
                </div>
            `);
        } else {
            res.send(`
                <div>
                    <p>You're not logged in</p>
                    <a href="/auth/login">Login</a>
                </div>
            `);
        }
    }

    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response): void {
        res.send(`
            <div>
                <p>Welcome to protected route, logged in user</p>
            </div>
        `);
    }
}
