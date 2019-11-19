import { Request, Response } from 'express';
import { get, post, controller, bodyValidator } from './decorators';

@controller('/auth')
class LoginController {
    @get('/login')
    getLogin(req: Request, res: Response): void {
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
    }

    @post('/login')
    @bodyValidator('email', 'password')
    postLogin(req: Request, res: Response): void {
        const { email, password } = req.body;
        if (email === 'nam' && password === '123') {
            req.session = { loggedIn: true };
            res.redirect('/');
        } else {
            res.send(`
                <div>
                    <p>Invalid email and password</p>
                    <a href="/auth/login">Login</a>
                </div>
            `);
        }
    }

    @get('/logout')
    getLogout(req: Request, res: Response): void {
        req.session = undefined;
        res.redirect('/');
    }
}
