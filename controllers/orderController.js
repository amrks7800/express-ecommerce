import {
  deleteOrderByID,
  getAllOrdersInDB,
  getOrdersByUserID,
  insertOrder,
} from "../models/order.js"

const getAllOrders = async (req, res) => {
  const { user } = req.query
  try {
    let orders

    if (!user) {
      orders = await getAllOrdersInDB()
    } else {
      orders = await getOrdersByUserID(user)
    }

    if (!orders.length)
      return res.status(404).json({ message: "no orders" })

    res.status(200).json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getOrderByID = async (req, res) => {
  const { id } = req.params

  if (!id)
    return res.status(400).json({ message: "no id param" })

  try {
    const [order] = await getAllOrdersInDB(id)

    if (!order)
      return res
        .status(404)
        .json({ message: "no order with this id in db" })

    res.json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const createNewOrder = async (req, res) => {
  const { user_id } = req.body

  if (!user_id)
    return res
      .status(400)
      .json({ message: "missing user id" })

  try {
    const [newOrder] = await insertOrder(user_id)

    res.json(newOrder)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteOrder = async (req, res) => {
  const { id } = req.params

  if (!id)
    res.status(400).json({ message: "missing id param" })

  try {
    const [order] = await getAllOrdersInDB(id)

    if (!order)
      return res
        .status(404)
        .json({ message: "order not found" })

    await deleteOrderByID(id)

    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export {
  getAllOrders,
  getOrderByID,
  createNewOrder,
  deleteOrder,
}
