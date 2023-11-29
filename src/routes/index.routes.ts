import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import conservationRoutes from "./conservation.routes";

const router = Router();

router.get('/hello', (req, res, next) => {
    res.status(200).json({
        message: "Hello WOrld"
    })
})

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/conservations', conservationRoutes);

export default router;