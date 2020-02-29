function create () {
  const color = document.getElementById('color').value
  const top = document.getElementById('top').value
  const middle = document.getElementById('middle').value
  const bottom = document.getElementById('bottom').value
  const image = document.getElementById('image').value

  const auth = getMeta('auth')
  const body = JSON.stringify({ color, top, middle, bottom, image })
  if (!top || !middle || !bottom || !color || !image) return alert('모든 필드가 채워져 있어야 합니다')

  fetch('/api/create?auth=' + auth, { headers: { 'Content-Type': 'application/json' }, body, method: 'PUT' })
    .then((res) => { return res.json() })
    .then((json) => {
      if (!json.sucess) alert('처리에 실패햐였습니다\n응답: ' + json.reason)
      else alert('처리가 완료되었습니다\nhttp://' + window.location.host + '/' + json.eid)
      window.location.reload()
    })
}

function getMeta(metaName) {
  const metas = document.getElementsByTagName('meta')

  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('name') === metaName) {
      return metas[i].getAttribute('content')
    }
  }

  return null;
}
