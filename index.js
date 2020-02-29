const cors = require('cors')
const path = require('path').resolve()
const http = require('http')
const https = require('https')
const express = require('express')
const register = require('./functions/register')
const apiRouter = require('./router/apiRouter')
const webRouter = require('./router/webRouter')
const { readFileSync } = require('fs')

const app = express()
const ssl = { cert: readFileSync(path + '/cert/trinets-cert.pem'), key: readFileSync(path + '/cert/trinets-key.pem') }

app.use(cors())
app.use('/api', express.json())
app.use('/src', express.static(path + '/src'))

apiRouter(app, register)
webRouter(app, register)

http.createServer(app).listen(80, () => { console.log('Non-SSL Server is now on http://localhost:80') })
https.createServer(ssl, app).listen(443, () => { console.log('SSL Server is now on https://localhost:433') })
