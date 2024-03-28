import { Router } from "express"
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js"
import authenticateToken from "../middleware/authenticateToken.js"

const productRoute = Router()

productRoute.get("/", getAllProducts)
productRoute.get("/:id", getSingleProduct)
productRoute.post(
  "/",
  authenticateToken(true),
  createProduct
)
productRoute.patch(
  "/:id",
  authenticateToken(true),
  updateProduct
)
productRoute.delete(
  "/:id",
  authenticateToken(true),
  deleteProduct
)

export default productRoute
