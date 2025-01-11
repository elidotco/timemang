import { Router } from "express";
import { companySignUp } from "../controllers/authController";

const router = Router();

router.post("/signup", (req, res, next) => {
  companySignUp(req, res, next).catch(next);
});

export default router;
