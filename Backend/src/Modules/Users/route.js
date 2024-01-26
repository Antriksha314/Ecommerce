import express from 'express';
import { AllUsers, UpdateProfile, User } from './Controller/UserController.js';
import { Register, Login, ChangePassword, Me} from './Controller/AuthController.js';
import { Protect } from '../../Middleware/Protect.js';

const router = express.Router();

router.post("/users/register", Register);
router.post("/users/login", Login);

router.put("/users/profile/update", Protect, UpdateProfile);
router.put("/users/change-password", Protect, ChangePassword);
router.get("/users/profile", Protect, Me);
router.get("/users", Protect, AllUsers);
router.get("/users/:id", Protect, User);

export default router;