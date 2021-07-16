import express from "express"

import listEndpoints from "express-list-endpoints"
import cors from "cors"
import createError from "http-errors"
import db from "./utils/db/index.js"

import productsRouter from "./services/products/index.js"
import reviewsRouter from "./services/reviews/index.js"


const port = process.env.PORT || 3001
const server = express()

server.use(express.json())

server.use("/products", productsRouter)
server.use("/reviews", reviewsRouter)

console.table(listEndpoints(server))

server.use((req, res) => {
    if (!req.route) {
      const error = createError(404, "This route is not found!")
      res.status(error.status).send(error)
    }
  })

  server.listen(port, () => console.log("server is running: " + port))

  server.on("error", (error) =>
      console.info(" ❌ Server is not running due to : ", error)
    )