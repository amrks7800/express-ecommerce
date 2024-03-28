import {
  createOrderItem,
  deleteOrderItemByID,
  getOrderItemsByOrderID,
  updateOrderItemInDB,
} from "../models/orderItem.js"

const getOrderItems = async (req, res) => {
  const { orderID } = req.params

  if (!orderID)
    return res
      .status(400)
      .json({ message: "no orderID param" })

  try {
    const orderItems = await getOrderItemsByOrderID(orderID)

    if (!orderItems.length)
      return res
        .status(404)
        .json({ message: "this order have no items yet" })

    res.json(orderItems)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const createNewOrderItem = async (req, res) => {
  const { product_id, amount } = req.body
  const { orderID } = req.params

  if (!product_id || !orderID)
    return res
      .status(400)
      .json({ message: "missing required data" })

  try {
    const [order] = await createOrderItem(
      orderID,
      product_id,
      amount
    )

    res.json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateOrderItem = async (req, res) => {
  const { id } = req.params
  const fieldsToUpdate = req.body

  if (!id)
    return res
      .status(400)
      .json({ message: "missing required data" })

  try {
    const [updatedOrderItem] = await updateOrderItemInDB(
      fieldsToUpdate,
      id
    )

    res.json(updatedOrderItem)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteOrderItem = async (req, res) => {
  const { id } = req.params

  if (!id)
    return res
      .status(400)
      .json({ message: "missing required data" })

  try {
    await deleteOrderItemByID(id)
    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export {
  getOrderItems,
  createNewOrderItem,
  updateOrderItem,
  deleteOrderItem,
}
