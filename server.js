import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import pool from "./db/index.js"
import userRouter from "./routes/userRoutes.js"
import imageRouter from "./routes/imageRoute.js"
import productRoute from "./routes/productRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import orderRouter from "./routes/orderRoute.js"
import "dotenv/config"
import { corsConfig } from "./config/corsConfig.js"

const app = express()

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// Routes
app.use("/user", userRouter)
app.use("/image", imageRouter)
app.use("/order", orderRouter)
app.use("/product", productRoute)
app.use("/category", categoryRoute)

// listen
pool.connect(err => {
  if (err) {
    console.log(err)
    return
  }

  console.log("connected to pg")

  app.listen(3000, () =>
    console.log(`server listening on http://localhost:3000`)
  )
})
