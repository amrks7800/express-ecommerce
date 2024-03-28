import { Router } from "express"
import authenticateToken from "../middleware/authenticateToken.js"
import {
  createNewOrder,
  deleteOrder,
  getAllOrders,
  getOrderByID,
} from "../controllers/orderController.js"
import {
  createNewOrderItem,
  getOrderItems,
  updateOrderItem,
} from "../controllers/orderItemsController.js"

const orderRouter = Router()

orderRouter.use(authenticateToken())

orderRouter.get("/", getAllOrders)
orderRouter.get("/:id", getOrderByID)
orderRouter.post("/", createNewOrder)
orderRouter.delete("/:id", deleteOrder)

orderRouter
  .route("/:orderID/item")
  .get(getOrderItems)
  .post(createNewOrderItem)

orderRouter
  .route("/:orderID/item/:id")
  .patch(updateOrderItem)
  .delete(deleteOrder)

export default orderRouter
