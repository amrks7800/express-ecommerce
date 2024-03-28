import pool from "../db/index.js"
import generatePatchQuery from "../utils/generatePatchQuery.js"

const getOrderItemsByOrderID = async id => {
  const { rows } = await pool.query(
    "select * from order_item where order_id = $1",
    [id]
  )

  return rows
}

const createOrderItem = async (
  order_id,
  product_id,
  amount
) => {
  let result

  if (amount && amount > 1) {
    result = await pool.query(
      "insert into order_item (order_id, product_id, amount) values ($1, $2, $3) returning *",
      [order_id, product_id, amount]
    )

    return result.rows
  }

  result = await pool.query(
    "insert into order_item (order_id, product_id) values ($1, $2) returning *",
    [order_id, product_id]
  )

  return result.rows
}

const updateOrderItemInDB = async (
  fieldsToUpdate,
  orderItemID
) => {
  const { query, values } = generatePatchQuery(
    fieldsToUpdate,
    "order_item",
    orderItemID
  )

  const { rows } = await pool.query(
    query + " returning *",
    values
  )

  return rows
}

const deleteOrderItemByID = async orderItemID => {
  await pool.query(
    " delete from order_item where id = $1 ",
    [orderItemID]
  )
}

export {
  getOrderItemsByOrderID,
  createOrderItem,
  updateOrderItemInDB,
  deleteOrderItemByID,
}
