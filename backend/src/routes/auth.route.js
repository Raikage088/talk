import { Router } from "express";
import { signup } from "./../controller/auth.controller.js";

const router = Router();

router.get("/signup", signup);
router.get("/signin", (req, res) => {
  res.send("Signin route");
});
router.get("/logout", (req, res) => {
  res.send("Logout route");
});

export default router;
