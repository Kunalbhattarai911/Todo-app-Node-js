import express from "express";
import { deleteUser, logout, updateUserDetail, userLogin, userRegistration } from "../controllers/userController.js";
import { loginValidator, registerValidation, updateProfileValidator } from "../middlewares/authValidation.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", registerValidation ,userRegistration);
router.post("/login", loginValidator , userLogin);
router.get("/logout",logout);
router.put("/updateProfile",isAuthenticated,updateProfileValidator,updateUserDetail);
router.delete("/delete/:id",deleteUser)

export default router;