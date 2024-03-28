import {
  deleteProductInDB,
  getAllProductsByCategoryID,
  getAllProductsByCategoryIDAndSearchKey,
  getAllProductsBySearchKey,
  getAllProductsInDB,
  getProductByID,
  insertProduct,
  updateProductInDB,
} from "../models/product.js"

const getAllProducts = async (req, res) => {
  const category_id = req.query.category
  const key = req.query.search

  try {
    let products

    if (category_id && !key)
      products = await getAllProductsByCategoryID(
        category_id
      )

    if (key && !category_id)
      products = await getAllProductsBySearchKey(key)

    if (key && category_id)
      products =
        await getAllProductsByCategoryIDAndSearchKey(
          key,
          category_id
        )

    if (!key && !category_id)
      products = await getAllProductsInDB()

    if (products.length) return res.json(products)

    res.status(404).json({ message: "no products in db" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getSingleProduct = async (req, res) => {
  const { id } = req.params

  if (!id)
    return res
      .status(400)
      .json({ message: "missing id param" })

  try {
    const [product] = await getProductByID(id)

    if (!product)
      return res
        .status(404)
        .json({ message: "product not found" })

    res.json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const createProduct = async (req, res) => {
  const {
    product_name,
    brand_name,
    price,
    image,
    category_id,
  } = req.body

  if (!product_name || !price)
    return res
      .status(400)
      .json({ message: "missing required product data" })

  try {
    const product = await insertProduct({
      product_name,
      price,
      category_id,
      image,
      brand_name,
    })

    res.json(product[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateProduct = async (req, res) => {
  const newFieldsValues = req.body
  const productID = req.params.id

  if (!newFieldsValues || !productID)
    return res
      .status(400)
      .json({ message: "missing updated values or id" })

  try {
    const updatedProduct = await updateProductInDB(
      newFieldsValues,
      productID
    )

    if (updatedProduct.length)
      return res.json(updatedProduct[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteProduct = async (req, res) => {
  const productID = req.params.id

  if (!productID)
    return res
      .status(400)
      .json({ message: "missing product id" })

  try {
    const isProductExist = await getProductByID(productID)

    if (!isProductExist.length)
      return res
        .status(404)
        .json({ message: "product not found" })

    await deleteProductInDB(productID)

    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
}
