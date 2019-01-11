import express from 'express';
import passport from 'passport';
import AuthMiddleWare from '../middleware/AuthMiddleware';

const router = express.Router();
const authMiddleWare = new AuthMiddleWare();

router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile'],
}));

router.get('/google/callback', 
passport.authenticate('google', { successRedirect: '/success',
failureRedirect: '/login' }));

router.get('/currentuser', authMiddleWare.getUser);

router.get('/logout', authMiddleWare.logout)

export default router;
