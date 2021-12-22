const express = require('express');
// require('express-async-errors');
 const cors = require('cors')


const app = express()

require('dotenv').config()
const connectDB = require('./db/connectDB')

const notFound = require('./middleware/404NotFound')
const errorHandlerMiddleware = require('./middleware/errorHandler')

// app.get('/api/v1/products', (req, res) => {
//   res.send('hello world')
// })
//routes
app.use(cors())
app.use('/api/v1/products', require('./routes/products'))

app.use(notFound)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 5000

const connect = async() => {
  try{
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`server is listening on port ${port}`))

  }catch(err){
    console.log(err)
  }
 
}
connect()
