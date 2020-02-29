const path = require('path').resolve()
const { renderFile } = require('ejs')

function fnc (app, register) {
  app.get('/', (_req, res) => res.redirect('/create'))
  app.get('/create', (_req, res) => {
    register.addCount()
    renderFile(path + '/page/create.ejs', { auth: register.createAuth(), count: register.getCount(), embCount: register.embCount() }, (err, str) => {
      if (err) console.log(err)
      else res.send(str)
    })
  })

  app.get('/:eid', (req, res) => {
    if (!req.params.eid) return
    const embed = register.getEmbed(req.params.eid)
    renderFile(path + '/page/embed.ejs', { embed }, (err, str) => {
      if (err) console.log(err)
      else res.send(str)
    })
  })
}

module.exports = fnc
