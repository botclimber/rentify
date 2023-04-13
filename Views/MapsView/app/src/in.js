const tokenName = 't'
const typeName = "tType"
const timeName = "tTime"

function checkLocalStorage(item){
    const urlParams = new URLSearchParams(window.location.search)

    console.log(item)
    const getFromLS = localStorage.getItem(item) || false
    const getFromURL = urlParams.get(item) || false

    if(getFromURL) {
        if(!getFromLS){ localStorage.setItem(item, getFromURL); console.log(getFromURL); return getFromURL;}
        else return getFromLS
    }else if(getFromLS) return getFromLS
    else return ""
}

const t = checkLocalStorage(tokenName)
const tType = checkLocalStorage(typeName)
const tTime = checkLocalStorage(timeName)

if(t != ""){
    document.getElementById("mLogin").style.display = "none"
    document.getElementById("mRegist").style.display = "none"
}else{
    document.getElementById("mProfile").style.display = "none"
    document.getElementById("mLogout").style.display = "none"
}

document.getElementById("mLogout").onclick = function(){

    localStorage.removeItem(tokenName)
    localStorage.removeItem(typeName)
    localStorage.removeItem(timeName)

    window.location.href = "/"
}

