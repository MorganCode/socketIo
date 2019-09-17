// Modules
let express = require('express')
let morgan = require('morgan')
let config = require('./config')

// Variables Glovales
const app = express()
const port = config.express.port
const options = {
  root: __dirname + '/views'
}

// Middlewares
app.use(express.static(options.root))
app.use(morgan('dev'))

// Routes
app.get('/', (req, res) => {
  res.redirect('/home')
})

app.get('/home', (req, res) => {
  res.sendFile('index.html', options)
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
app.listen(port, () => console.log('Server starting, on port ' + port))
