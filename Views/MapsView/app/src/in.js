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

/** =MARKER REVIEW DINAMIC= */

/**
 * @author botclimber
 * 
 * if review is too long it hides a part and then if user click "read more" it shows everything
 * 
 * @param {String} revId review id 
 * @return {void} 
 */
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

  /**
   * search filter that considers floor and direction fields
   * 
   * @author w3schools ft botclimber
   * @param {number} latAsId 
   * @param {number} lngAsId 
   */
  function filterRevs(latAsId, lngAsId){

    var input, filter, ul, li, i;
    input = document.getElementById("filterRevsInput"+(latAsId+lngAsId));
    filter = input.value.toUpperCase();
    ul = document.getElementById("revContent"+(latAsId+lngAsId));
    li = ul.getElementsByTagName("li");

    if(filter === "") {
        [...li].map( r => {
            r.style.display = ""
        })
    }
    else{
        
        for (i = 0; i < li.length; i++) {
            
            div = li[i].getElementsByClassName("resContent"+(latAsId+lngAsId))[0];
            p = div.getElementsByTagName("p")[0]
            
            if (p !== undefined && p.innerText.toUpperCase().indexOf(filter) > -1) li[i].style.display = "";
            else li[i].style.display = "none";
        }
    }
  }

