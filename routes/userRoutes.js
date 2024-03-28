import { Router } from "express"
import {
  getCurrentUser,
  login,
  logout,
  registerNewUser,
} from "../controllers/userController.js"

const userRouter = Router()

userRouter.post("/register", registerNewUser)
userRouter.post("/login", login)
userRouter.get("/session", getCurrentUser)
userRouter.delete("/logout", logout)

export default userRouter
