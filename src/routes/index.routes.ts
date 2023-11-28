import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

const router = Router();

router.get('/hello', (req, res, next) => {
    res.status(200).json({
        message: "Hello WOrld"
    })
})

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

export default router;