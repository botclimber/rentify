const urlParams = new URLSearchParams(window.location.search)
const tk = urlParams.get('t')

localStorage.setItem("t", tk)
