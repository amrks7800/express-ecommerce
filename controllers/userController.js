import {
  createNewUser,
  getUserByEmail,
  getUserByID,
} from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { dayInMilliSeconds } from "../constants/index.js"

const registerNewUser = async (req, res) => {
  const { first_name, last_name, email, password } =
    req.body

  if (!first_name || !last_name || !email || !password)
    return res
      .status(400)
      .json({ message: "all user data is required" })

  try {
    const duplicate = await getUserByEmail(email)

    if (duplicate.length)
      return res.status(409).json({
        message: "a user with the same email exist in db",
      })

    const hashedPwd = await bcrypt.hash(password, 10)

    const newUser = await createNewUser(
      first_name,
      last_name,
      email,
      hashedPwd
    )

    if (newUser.length) res.status(201).json(newUser[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "all user data are required" })

  const user = await getUserByEmail(email)

  if (!user.length)
    return res
      .status(404)
      .json({ message: "user not found" })

  const isTheSamePassword = await bcrypt.compare(
    password,
    user[0].password
  )

  if (!isTheSamePassword)
    return res
      .status(400)
      .json({ message: "wrong password" })

  const accessToken = jwt.sign(
    { id: user[0].id, roles: user[0].role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  )

  res.cookie("token", accessToken, {
    maxAge: dayInMilliSeconds,
    httpOnly: true,
  })

  res.json({ token: accessToken, role: user[0].role })
}

const getCurrentUser = async (req, res) => {
  const { token } = req.cookies

  if (!token)
    return res.status(401).json({ message: "unauthorized" })

  const decodedTokenPayload = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET
  )

  try {
    const [user] = await getUserByID(decodedTokenPayload.id)

    if (!user) return res.sendStatus(404)

    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const logout = async (_, res) => {
  res.clearCookie("token", {
    maxAge: dayInMilliSeconds,
    httpOnly: true,
  })

  res.sendStatus(200)
}

export { registerNewUser, login, getCurrentUser, logout }
