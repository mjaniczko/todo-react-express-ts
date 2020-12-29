import { Router } from 'express';
import { createUser, login } from '../controllers/userController';

const router: Router = Router();

router.post('/signup', createUser);
router.post('/login', login);
// router.post('/forgotPassword');
// router.patch('/resetPassword/:token');

// Protect all routes after this middleware
// router.use();

// router.get('/me');
// router.patch('/updateMyPassword');
// router.patch('/updateMe');
// router.delete('/deleteMe');

// TODO: add imports from root dir

export default router;
