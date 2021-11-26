const errorHandler = async(err, req, res, next ) => {
  console.log(err);
  res.status(500).json({msg: 'there is an error somewhere'})
}

module.exports = errorHandler