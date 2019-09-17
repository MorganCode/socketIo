let express = require('express')
let app = express()
let morgan = require('morgan')

// Middleware
app.use(morgan('dev'))

// Routes
app.get('/home', (req, res) => {
  res.send('hello')
})

app.get('/params/:name', (req, res) => {
  let name = req.params.name
  res.send('hello ' + name)
})

app.get('/items', (req, res) => {
  let query = req.query
  res.send('Items ' + JSON.stringify(query))
})

// Start server
app.listen(8080, () => console.log('Server starting, on port 8080'))
