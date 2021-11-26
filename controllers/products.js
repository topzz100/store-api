const asyncWrapper = require('../middleware/async-wrapper')
const Products = require('../db/models/products') 

const getProducts = asyncWrapper(async (req,res) => {
  const products =await Products.find()
  res.status(200).json({products, nbHits : products.length})
})
const getProductsStatic = asyncWrapper(async (req,res) => {
 const products = await Products.find()
 res.status(200).json(products)
})

module.exports = {
  getProducts,
  getProductsStatic
}