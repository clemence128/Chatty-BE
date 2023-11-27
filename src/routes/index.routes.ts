import { Router } from "express";
import authRoutes from "./auth.routes";

const router = Router();

router.get('/hello', (req, res, next) => {
    res.status(200).json({
        message: "Hello WOrld"
    })
})

router.use('/auth', authRoutes);

export default router;