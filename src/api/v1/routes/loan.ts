import express, { Router } from 'express';
import { isAuthenticate } from '../middleware/authenticate';
import { isAuthorize } from '../middleware/authorize';
import { createLoan, reviewLoan } from '../controllers/loan';

const router: Router = express.Router();

router.post('/create', isAuthenticate, isAuthorize({
    hasRole:['user'],
    allowSameUser: true
}), createLoan)

router.put('/:id/review', isAuthenticate, isAuthorize({
    hasRole:['officer', 'admin'],
    allowSameUser: true
}), reviewLoan)

export default router