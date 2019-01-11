import express from 'express';
import socket from 'socket.io';
import http from 'http';
import dotEnv from 'dotenv';
import passport from 'passport';
import PassPort from './services/PassPort';
import cookieSession from 'cookie-session';
import authRoute from './route/AuthRoute';

dotEnv.config();

const app = express();

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.cookieKey],
}));

const passportInit = new PassPort();
passportInit.configure();


app.use(passport.initialize());

app.use(passport.session());

app.use('/api/v1/auth', authRoute);

const port = process.env.PORT || 6000;
const server = http.createServer(app);
const io = socket().listen(server);
io.on('connection', (sc) => {
    console.log(`user connected, id: ${sc.id}`);
});

server.listen(port, () =>{
    console.log(`server is listening on port ${port}`); 
});

export default app;
