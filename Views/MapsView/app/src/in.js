const tokenName = 't'
const typeName = "tType"
const timeName = "tTime"
const firstName = "firstName"
const lastName = "lastName"

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
const fName = checkLocalStorage(firstName)
const lName = checkLocalStorage(lastName)

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
    localStorage.removeItem(firstName)
    localStorage.removeItem(lastName)

    window.location.href = "/"
}

function readMore(revId) {
    var dots = document.getElementById("dots"+revId);
    var moreText = document.getElementById("more"+revId);
    var btnText = document.getElementById("readMore"+revId);

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more"; 
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less"; 
      moreText.style.display = "inline";
    }
  }

