const asyncWrapper = require('../middleware/async-wrapper')
const Products = require('../db/models/products') 

const getProducts = asyncWrapper(async (req,res) => {
  const {name, featured, company, sort, fields, numericFilters} = req.query
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
//numeric filters
 if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  
  let result = Products.find(queryObject)

  //sort
  if(sort){
   const sortList = sort.split(',').join(' ')
   result = result.sort(sortList)  
  }else{
    result = result.sort('rating')
  }

   if(fields){
   const fieldsList = fields.split(',').join(' ')
   result = result.select(fieldsList)  
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page-1) * limit
  const reault = result.skip(skip).limit(limit)

  const products = await result
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