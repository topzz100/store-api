const notFound = (req, res) => {
  res.status(404).send('this route cannot be found')
}
module.exports = notFound