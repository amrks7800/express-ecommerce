import {
  deleteCategoryByID,
  getAllCategoriesInDB,
  getCategoryByID,
  getCategoryByName,
  insertCategory,
  updateCategoryInDB,
} from "../models/category.js"

const getAllCategories = async (req, res) => {
  try {
    const categories = await getAllCategoriesInDB()

    if (!categories.length)
      return res
        .status(404)
        .json({ message: "no categories in db" })

    res.json(categories)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getSingleCategory = async (req, res) => {
  const { id } = req.params

  if (!id)
    return res
      .status(400)
      .json({ message: "missing id param" })

  try {
    const [category] = await getCategoryByID(id)

    if (!category) return res.sendStatus(404)

    res.json(category)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const createCategory = async (req, res) => {
  const { category_name } = req.body

  if (!category_name)
    return res
      .status(400)
      .json({ message: "missing category_name" })

  try {
    const [duplicate] = await getCategoryByName(
      category_name
    )

    if (duplicate)
      return res.status(409).json({
        message: "category with the same name exist",
      })

    const [category] = await insertCategory(category_name)

    res.json(category)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateCategory = async (req, res) => {
  const { id } = req.params
  const { category_name } = req.body

  if (!id || !category_name)
    return res.status(400).json({ message: "missing id" })

  try {
    const [category] = await updateCategoryInDB(
      id,
      category_name
    )

    res.json(category)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteCategory = async (req, res) => {
  const { id } = req.params

  if (!id)
    return res
      .status(400)
      .json({ message: "missing id param" })

  try {
    const [isCatExist] = await getCategoryByID(id)

    if (!isCatExist)
      return res.status(404).json({ message: "not found" })

    await deleteCategoryByID(id)

    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getSingleCategory,
}
