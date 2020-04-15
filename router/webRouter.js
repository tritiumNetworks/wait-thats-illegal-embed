const path = require('path').resolve()
const { renderFile } = require('ejs')

function fnc (app, register) {
  app.get('/', (_req, res) => res.redirect('/embed/create'))
  app.get('/create', (_req, res) => {
    register.addCount()
    renderFile(path + '/router/embed/page/create.ejs', { auth: register.createAuth(), count: register.getCount(), embCount: register.embCount() }, (err, str) => {
      if (err) console.log(err)
      else res.send(str)
    })
  })

  app.get('/:eid', (req, res) => {
    register.addCount()
    if (!req.params.eid) return
    const embed = register.getEmbed(req.params.eid)
    renderFile(path + '/router/embed/page/embed.ejs', { embed }, (err, str) => {
      if (err) console.log(err)
      else res.send(str)
    })
  })
}

module.exports = fnc
