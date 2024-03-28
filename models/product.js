import pool from "../db/index.js"
import generatePatchQuery from "../utils/generatePatchQuery.js"

const getAllProductsInDB = async () => {
  const products = await pool.query(
    "select * from products"
  )

  return products.rows
}

const getAllProductsByCategoryID = async category_id => {
  const products = await pool.query(
    "select * from products where category_id = $1",
    [category_id]
  )

  return products.rows
}

const getAllProductsBySearchKey = async key => {
  console.log(key)

  const { rows } = await pool.query(
    "select * from products where document @@ to_tsquery($1)",
    [key]
  )

  return rows
}

const getAllProductsByCategoryIDAndSearchKey = async (
  key,
  category_id
) => {
  const { rows } = await pool.query(
    "select * from products where category_id = $1 and document @@ to_tsquery($2)",
    [category_id, key]
  )

  return rows
}

const insertProduct = async ({
  product_name,
  price,
  category_id,
  brand_name,
  image,
}) => {
  const newUser = await pool.query(
    "insert into products (product_name, brand_name, image, price, category_id) values ($1, $2, $3, $4, $5) returning *",
    [product_name, brand_name, image, price, category_id]
  )

  return newUser.rows
}

const updateProductInDB = async (updatedValues, id) => {
  const { query, values } = generatePatchQuery(
    updatedValues,
    "products",
    id
  )

  const updateProduct = await pool.query(
    query + " returning *",
    values
  )

  return updateProduct.rows
}

const deleteProductInDB = async id => {
  await pool.query("delete from products where id = $1", [
    id,
  ])
}

const getProductByID = async id => {
  const result = await pool.query(
    "select * from products where id = $1",
    [id]
  )

  return result.rows
}

export {
  getAllProductsInDB,
  insertProduct,
  updateProductInDB,
  deleteProductInDB,
  getProductByID,
  getAllProductsByCategoryID,
  getAllProductsBySearchKey,
  getAllProductsByCategoryIDAndSearchKey,
}
