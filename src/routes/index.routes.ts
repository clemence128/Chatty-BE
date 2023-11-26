import { Router } from "express";

const router = Router();

router.get('/hello', (req, res, next) => {
    res.status(200).json({
        message: "Hello WOrld"
    })
})

export default router;