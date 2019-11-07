import { Router, Request, Response, NextFunction } from 'express';

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Not permitted');
};

interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined };
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
    res.send(`
        <form method="POST">
            <div>
                <label>Email</label>
                <input name="email"/>
            </div>
            <div>
                <label>Password</label>
                <input name="password" type="password"/>
            </div>
            <button>Submit</button>
        </form>
    `);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body;
    if (email && password && email === 'nam' && password === '123') {
        req.session = { loggedIn: true };
        res.redirect('/');
    } else {
        res.send(`
            <div>
                <p>Invalid email and password</p>
                <a href="/login">Login</a>
            </div>
        `);
    }
});

router.get('/', (req: Request, res: Response) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
            <div>
                <p>You're logged in</p>
                <a href="/logout">Logout</a>
            </div>
        `);
    } else {
        res.send(`
            <div>
                <p>You're not logged in</p>
                <a href="/login">Login</a>
            </div>
        `);
    }
});

router.get('/logout', (req: Request, res: Response) => {
    req.session = undefined;
    res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
    res.send(`
        <div>
            <p>Welcome to protected route, logged in user</p>
        </div>
    `);
});

export { router };
