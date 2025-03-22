import express, { Router } from 'express';
import { isAuthenticate } from '../middleware/authenticate';
import { isAuthorize } from '../middleware/authorize';
import { approveLoan, createLoan, deleteLoan, getAllLoans, reviewLoan } from '../controllers/loan';

const router: Router = express.Router();

router.post('/create', isAuthenticate, isAuthorize({
    hasRole:['user']
}), createLoan)

router.put('/:id/review', isAuthenticate, isAuthorize({
    hasRole:['officer']
}), reviewLoan)

router.put('/:id/approve', isAuthenticate, isAuthorize({
    hasRole:['manager']
}), approveLoan)

router.get('/', isAuthenticate, isAuthorize({
    hasRole:['manager', 'officer']
}), getAllLoans)

router.delete(
    "/:id/delete",
    isAuthenticate,
    isAuthorize({ hasRole: ["manager"] }),
    deleteLoan
);

export default router