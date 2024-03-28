import pool from "../db/index.js"
import generatePatchQuery from "../utils/generatePatchQuery.js"

const getAllCategoriesInDB = async () => {
  const { rows } = await pool.query(
    "select * from categories"
  )

  return rows
}

const insertCategory = async category_name => {
  const { rows } = await pool.query(
    "insert into categories (category_name) values ($1) returning *",
    [category_name]
  )

  return rows
}

const getCategoryByName = async category_name => {
  const { rows } = await pool.query(
    "select * from categories where category_name = $1",
    [category_name]
  )

  return rows
}

const getCategoryByID = async id => {
  const { rows } = await pool.query(
    "select * from categories where id = $1",
    [id]
  )

  return rows
}

const updateCategoryInDB = async (id, category_name) => {
  const { query, values } = generatePatchQuery(
    { category_name },
    "categories",
    id
  )

  const { rows } = await pool.query(
    query + " returning *",
    values
  )

  return rows
}

const deleteCategoryByID = async id => {
  await pool.query("delete from categories where id = $1", [
    id,
  ])
}

export {
  getAllCategoriesInDB,
  insertCategory,
  getCategoryByName,
  getCategoryByID,
  updateCategoryInDB,
  deleteCategoryByID,
}
