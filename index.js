const register = require('./functions/register')
const apiRouter = require('./router/apiRouter')
const webRouter = require('./router/webRouter')

module.exports = { _root: '/embed', _socket: false, _cors: true, _parser: ['json'], ready, static: '/src' }

function ready (app) {
  console.log('embed is loaded')
  apiRouter(app, register)
  webRouter(app, register)
}
