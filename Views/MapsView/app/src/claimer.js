"use strict";

var resCity= document.getElementById("resCity")
var resStreet= document.getElementById("resStreet")
var resBNumber= document.getElementById("resBNumber")
var resFloor= document.getElementById("resFloor")
var resSide= document.getElementById("resSide")

var resLat= document.getElementById("resLat")
var resLng= document.getElementById("resLng")
var resFlag= document.getElementById("resFlag")

var resFreeNo= document.getElementById("resFreeNo")
var resFreeYes= document.getElementById("resFreeYes")

var fileProof = document.getElementById("fileProof")

var claimResidenceBtn = document.getElementById("claimResidence")

// check if data filled in order to then make request to server
claimResidenceBtn.addEventListener("click", async (event) => {
    if( ((resLat.value !== "" && resLng.value !== "") || resCity.value !=="" && resStreet.value !== "" && resBNumber.value !== "" ) && (resFloor.value !== "" && resSide.value !== "" && fileProof.files[0] && (resFreeNo.checked || resFreeYes.checked))){

        const data = new FormData()
        data.append("file", files[0])
        data.append("resLat", resLat.value)
        data.append("resLng", resLng.value)
        // TODO: keep working  on this

        await fetch(userService+'/user/updateProfileImg/'+uId,{
            method: 'POST',
            headers: {
            //'Content-Type': 'application/json; multipart/form-data;',
            'authorization': 'baer '+t
            },
            body: data
        })
        .then(res =>{ if(res.ok){ return res.json() } else return false })
        .then(data => {
            console.log(data); 
            
            if(data){

                localStorage.setItem(uImg, data.img)
                proImg.src = "images/userImages/"+data.img
            }
        })
        .catch(err => console.log(err))

    }else console.log("Fill all required fields!")

})