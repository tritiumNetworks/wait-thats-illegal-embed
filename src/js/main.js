let data = getMeta('data').split(';')

Swal.fire({
  title: 'Embed Maker',
  html: "심심해서 만든 디스코드 임베딩 도구<br />" + data[1] + '번째 접속, ' + data[2] + '개의 임베드',
  imageUrl: 'https://discordapp.com/assets/94db9c3c1eba8a38a1fcf4f223294185.png',
  imageAlt: 'Discord',
  confirmButtonText: '시작하기!',
  allowEscapeKey: false,
  allowOutsideClick: false
}).then(() => {
  Swal.mixin({
    input: 'text',
    imageUrl: 'https://cdn.discordapp.com/attachments/530043751901429762/683589714426462258/unknown.png',
    imageAlt: 'example',
    confirmButtonText: '다음 <i class="fas fa-arrow-alt-circle-right"></i>',
    allowEscapeKey: false,
    allowOutsideClick: false,
    progressSteps: ['1', '2', '3', '4', '5'],
    inputValidator: (v) => {
      return new Promise((resolve) => {
        if (v.length < 1) resolve('아무 값이라도 적어주세요')
        else resolve()
      })
    }
  }).queue([
    '임베드 상단에 표시될\n문구를 정해주세요',
    '임베드 제목을 입력해주세요',
    '임베드 내용을 입력해주세요',
    '임베드 색상을 입력해주세요',
    '임베드 이미지 링크를 입력해주세요'
  ]).then((result) => {
    if (result.value) {
      const v = result.value
      const body = JSON.stringify({ top: v[0], middle: v[1], bottom: v[2], color: v[3], image: v[4] })
      fetch('/api/create?auth=' + data[0], { headers: { 'Content-Type': 'application/json' }, body, method: 'PUT' })
        .then((res) => { return res.json() })
        .then((json) => {
          if (!json.sucess) Swal.fire({ title: '처리에 실패햐였습니다', text: json.reason, icon: 'error', allowEscapeKey: false, allowOutsideClick: false, showConfirmButton: false })
          else Swal.fire({ title: '처리가 완료되었습니다', html:'디스코드 채팅방에 이 링크를 보내보세요<hr/><input class="form-control result" type="text" value="http://' + window.location.host + '/' + json.eid + '">', icon: 'success', allowEscapeKey: false, allowOutsideClick: false, showConfirmButton: false })
        })
    }
  })
})

function getMeta(metaName) {
  const metas = document.getElementsByTagName('meta')

  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('name') === metaName) {
      return metas[i].getAttribute('content')
    }
  }

  return null;
}
