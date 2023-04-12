const urlParams = new URLSearchParams(window.location.search)
const tk = urlParams.get('t')
const tType = urlParams.get('ut')
const tTime = urlParams.get('expTime')

localStorage.setItem("t", tk)
localStorage.setItem("tType", tType)
localStorage.setItem("tTime", tTime)
