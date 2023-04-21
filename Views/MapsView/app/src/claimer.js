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
claimResidenceBtn.addEventListener("click", (event) => {
    if( ((resLat.value !== "" && resLng.value !== "") || resCity.value !=="" && resStreet.value !== "" && resBNumber.value !== "" ) && (resFloor.value !== "" && resSide.value !== "" && fileProof.files[0] && (resFreeNo.checked || resFreeYes.checked))){

            console.log("GOOD")
    }else console.log("BAD")

})