import express, { Router } from 'express';
import { isAuthenticate } from '../middleware/authenticate';
import { isAuthorize } from '../middleware/authorize';
import { approveLoan, createLoan, reviewLoan } from '../controllers/loan';

const router: Router = express.Router();

router.post('/create', isAuthenticate, isAuthorize({
    hasRole:['user'],
    allowSameUser: true
}), createLoan)

router.put('/:id/review', isAuthenticate, isAuthorize({
    hasRole:['officer', 'admin'],
    allowSameUser: true
}), reviewLoan)

router.put('/:id/approve', isAuthenticate, isAuthorize({
    hasRole:['manager', 'admin'],
    allowSameUser: true
}), approveLoan)

export default router