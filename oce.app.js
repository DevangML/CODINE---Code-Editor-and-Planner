// Import Section
const express = require('express')
const { ocePostRouter, oceVanillaRouter } = require('./routes/oce.routes')
const cors = require('cors')
const path = require('path')
require('dotenv').config({ path: '.env' })
const compression = require('compression')
const header_middleware = require('./controllers/middlewares/header')
const postRouter = require('./Routes/post')
const userRoutes = require('./Routes/user')
const profileRoutes = require('./Routes/profile')

// App Initialization
const expressApp = express()

// Compression

expressApp.use(compression())

// CORS Setup
var corsOptions = {
  origin: 'http://localhost:3000'
}
expressApp.use(cors(corsOptions))

// Basic express config
expressApp.use(express.json())
expressApp.use(express.urlencoded({ extended: true }))

// Post Route
expressApp.use('/contact', ocePostRouter)

// Static view configuration

expressApp.use(express.static(path.resolve(__dirname, './view/build')))

// Catch all requests that don't match any route
expressApp.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './view/build/index.html'))
})

// Pusher Code

expressApp.use('/vanilla', oceVanillaRouter)

module.exports = expressApp

// Logic

app.use(header_middleware)
const directory = path.join(__dirname, './images')
app.use('/images', express.static(directory))
// app.use("/", express.static(path.join(__dirname, 'angular')));

app.use('/api/posts', postRouter)
app.use('/api/user', userRoutes)
app.use('/api/profile', profileRoutes)

app.get('/test', (req, res) => {
  res.send('Hello World!')
})

// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, "angular", "index.html"))
// });
app.listen(PORT, (req, res) => {
  console.log(`app is listening to PORT ${PORT}`)
})
