const asyncWrapper = require('../middleware/async-wrapper')
const Products = require('../db/models/products') 

const getProducts = asyncWrapper(async (req,res) => {
  const {name, featured, company} = req.query
  const queryObject = {}

  if(name){
    queryObject.name = {$regex : name, $options : 'i'}
  }
  if(featured){
    queryObject.featured = featured === 'true' ? true : false
  }
  if(company){
    queryObject.company = company
  }
  const products =await Products.find(queryObject)
  res.status(200).json({nbHits : products.length, products})
})
const getProductsStatic = asyncWrapper(async (req,res) => {
 const products = await Products.find()
 res.status(200).json(products)
})

module.exports = {
  getProducts,
  getProductsStatic
}