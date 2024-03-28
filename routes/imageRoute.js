import { Router } from "express"
import upload from "../middleware/multer.js"
import { uploadImage } from "../controllers/imageController.js"
import authenticateToken from "../middleware/authenticateToken.js"

const imageRouter = Router()

imageRouter.use(authenticateToken(true))

imageRouter.post(
  "/upload",
  upload.single("image"),
  uploadImage
)

export default imageRouter
