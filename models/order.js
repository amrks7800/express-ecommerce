import pool from "../db/index.js"

const getAllOrdersInDB = async () => {
  const orders = await pool.query("select * from orders")

  return orders.rows
}

const getOrdersByUserID = async user_id => {
  const orders = await pool.query(
    "select * from orders where user_id = $1",
    [user_id]
  )

  return orders.rows
}

const getOrderByIDInDB = async id => {
  const { rows } = await pool.query(
    "select * from orders where id = $1",
    [id]
  )

  return rows
}

const insertOrder = async user_id => {
  const { rows } = await pool.query(
    "insert into orders (user_id) values ($1) returning *",
    [user_id]
  )

  return rows
}

const deleteOrderByID = async id => {
  await pool.query("delete from orders where id = $1", [id])
}

export {
  getAllOrdersInDB,
  getOrderByIDInDB,
  insertOrder,
  deleteOrderByID,
  getOrdersByUserID,
}
