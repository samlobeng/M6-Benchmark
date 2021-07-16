import { Router } from "express";
import db from "../../utils/db/index.js"
import uniqid from "uniqid"

const productsRouter = Router()


productsRouter.get("/", async (req, res, next) => {
    try {
     const query = "SELECT * FROM products"
     const data = await db.query(query)
      res.send(data.rows)
    } catch (error) {
      next(error)
    }
  })

  productsRouter.get("/:id", async (req, res, next) => {
    try {
        const query = `SELECT * FROM products WHERE id='${req.params.id}'`
     const data = await db.query(query)
     res.send(data.rows[0])
    } catch (error) {
      next(error)
    }
  })

  productsRouter.post("/", async (req, res, next) => {
    try {
       const {id=uniqid(), name, description, brand, imageurl, price} = req.body
        const query = `INSERT INTO products(id, name, description, brand, imageUrl, price) VALUES('${id}', '${name}','${description}','${brand}','${imageurl}',${price})`
        const data = await db.query(query)
      res.status(201).send(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

  productsRouter.put("/:id", async (req, res, next) => {
    try {
     const {name, description, brand, imageurl, price} = req.body
     const query =  `UPDATE products SET name = ${name}, description = ${description}, brand = ${brand}, imageurl = ${imageurl}, price = ${price} WHERE id = '${req.params.id}'`
      const data  = await db.query(query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  })
  
  productsRouter.delete("/:id", async (req, res, next) => {
    try {
     const query =  `DELETE FROM products WHERE id = '${req.params.id}'`
     const data = await db.query(query)
     if(data.rowCount>0){
        res.send("OK")
     }else{
         res.status(404).send("NOT FOUND")
     }
    } catch (error) {
      next(error)
    }
  })
  



export default productsRouter