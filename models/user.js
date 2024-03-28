import pool from "../db/index.js"

const getUserByEmail = async email => {
  const user = await pool.query(
    "select * from users where email = $1",
    [email]
  )

  return user.rows
}

const createNewUser = async (
  first_name,
  last_name,
  email,
  hashedPwd
) => {
  const newUser = await pool.query(
    "insert into users (first_name, last_name, email, password) values ($1, $2, $3, $4) returning first_name, last_name, email, id",
    [first_name, last_name, email, hashedPwd]
  )

  return newUser.rows
}

const getUserByID = async id => {
  const user = await pool.query(
    "select id, first_name, last_name, email, role from users where id = $1",
    [id]
  )

  return user.rows
}

export { getUserByEmail, createNewUser, getUserByID }
