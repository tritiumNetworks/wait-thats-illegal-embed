const PORT = process.env.embedPort || 8080

const cors = require('cors')
const path = require('path').resolve()
const express = require('express')
const register = require('./functions/register')
const apiRouter = require('./router/apiRouter')
const webRouter = require('./router/webRouter')

const app = express()
app.use(cors())
app.use('/api', express.json())
app.use('/src', express.static(path + '/src'))

apiRouter(app, register)
webRouter(app, register)

app.listen(PORT, () => {
  console.log('Embed Server is on http://localhost:' + PORT)
})
