import { Router } from "express";
import { registerUser, authUser, allUsers } from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.route("/").get(protect, allUsers);
userRouter.route("/").post(registerUser)
userRouter.post("/login", authUser);

export default userRouter;