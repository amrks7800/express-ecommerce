import jwt from "jsonwebtoken"
import { getUserByID } from "../models/user.js"

const authenticateToken =
  isAdminAccess => async (req, res, next) => {
    const { token } = req.cookies

    if (!token)
      return res
        .status(401)
        .json({ message: "unauthorized" })

    try {
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      )
      const [user] = await getUserByID(decoded.id)

      if (isAdminAccess && !decoded.roles)
        return res
          .status(403)
          .json({ message: "not admin" })

      const isAdminRoleExist =
        decoded.roles.includes("admin")

      if (isAdminAccess && !isAdminRoleExist)
        return res
          .status(403)
          .json({ message: "not admin" })

      if (!user)
        return res
          .status(401)
          .json({ message: "unauthorized" })

      next()
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

export default authenticateToken
