import { Router } from "express"
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "../controllers/categoryController.js"
import authenticateToken from "../middleware/authenticateToken.js"

const categoryRoute = Router()

categoryRoute.get("/", getAllCategories)
categoryRoute.get("/:id", getSingleCategory)
categoryRoute.post(
  "/",
  authenticateToken(true),
  createCategory
)
categoryRoute.patch(
  "/:id",
  authenticateToken(true),
  updateCategory
)
categoryRoute.delete(
  "/:id",
  authenticateToken(true),
  deleteCategory
)

export default categoryRoute
