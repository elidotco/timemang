import { Router } from "express";
import { companySignUp, userLogin } from "../controllers/authController";

const router = Router();

router.post("/signup", (req, res, next) => {
  companySignUp(req, res, next).catch(next);
});
router.post("/login", (req, res, next) => {
  userLogin(req, res, next).catch(next);
});
export default router;
