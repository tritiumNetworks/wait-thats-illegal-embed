function fnc (app, register) {
  app.all('/api/create', (req, res) => {
    if (req.method === 'GET') return res.send({ success: false, reason: 'Request Error) Not Allowed Method' })
    if (!req.query.auth) return res.send({ sucess: false, reason: 'Request Error) Unauthorized Request' })
    if (!register.useAuth(req.query.auth)) return res.send({ sucess: false, reason: 'Request Error) Auth-Code is not Correct!' })
    if (!req.body) return res.send({ sucess: false, reason: 'Request Error) Request Body is not Exist!' })
    if (isNotCompletedBody(req.body)) return res.send({ success: false, reason: 'Request Error) Request Body is not Completed' })
    if (JSON.stringify(req.body).length > 500) return res.send({ success: false, reason: 'Requet Error) Request Body is too Large' })

    const eid = register.addEmbed(req.body)
    res.send({ sucess: true, eid })
  })
}

function isNotCompletedBody (body) {
  return !body.top || !body.middle || !body.bottom || !body.color || !body.image
}

module.exports = fnc
