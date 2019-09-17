// Modules
let express = require('express')
let http = require('http')
let socketio = require('socket.io')
let morgan = require('morgan')
let config = require('./config')

// Global var
const app = express()
const server = http.Server(app)
const io = socketio(server)
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

// Socket
io.on('connection', function(socket) {
  // USER connected
  console.log(`User ${socket.id} connected`)

  // Emit
  setTimeout(() => {
    socket.emit('hi')
  }, 1000)

  socket.on('hi', () => {
    console.log('A client say hi !')
  })

  // USER disconnected
  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`)
  })
})

// Start server
server.listen(port, () => console.log('Server starting, on port ' + port))
