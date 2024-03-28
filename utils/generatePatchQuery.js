const generatePatchQuery = (
  fieldsToUpdateObject,
  tableName,
  id,
  customIdFieldName
) => {
  const primaryKey = customIdFieldName || "id"

  const keys = Object.keys(fieldsToUpdateObject)

  let query = `update ${tableName} set`
  const values = []

  for (let i = 0; i < keys.length; i++) {
    if (i !== keys.length - 1) {
      query += ` ${keys[i]} = $${i + 1},`
    } else {
      query += ` ${keys[i]} = $${i + 1}`
    }
    values.push(fieldsToUpdateObject[keys[i]])
  }

  values.push(id)

  query += ` where ${primaryKey} = $${keys.length + 1}`

  return { query, values }
}

export default generatePatchQuery
