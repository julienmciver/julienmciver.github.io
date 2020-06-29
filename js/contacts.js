// When the user clicks on div, open the popup
//onmouseover = "fadeIn_popup_2()"
function isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
}

function fadeIn_popup() {
    var popup = document.getElementById("myPopup");
    popup.classList.add("show");
    popup.classList.remove("hide");
    
  }

function fadeOut_popup(){
    var popup = document.getElementById("myPopup");
    popup.classList.remove("show");
    popup.classList.add("hide");
    
}

function fadeIn_popup_2() {
    var popup = document.getElementById("myPopup_2");
    changePopup();
    popup.classList.add("show");
    popup.classList.remove("hide");
    
  }

function fadeOut_popup_2(){
    var popup = document.getElementById("myPopup_2");
    popup.classList.remove("show");
    popup.classList.add("hide");
    
}

function fadeIn_popup_3() {
    var popup = document.getElementById("myPopup_3");
    changePopup();
    popup.classList.add("show");
    popup.classList.remove("hide");
    
  }

function fadeOut_popup_3(){
    var popup = document.getElementById("myPopup_3");
    popup.classList.remove("show");
    popup.classList.add("hide");
    
}


//get a new date-time, figure out if it is a date-time. If certain sections of it are outside of certain boundaires. I'll do the logic piece by piece.
function checkDate(){
    var d = new Date();
    
    d2 = d.toString().split(" ");
    console.log(d2);

    if (d2[0] == "Sat" || d2[0] == "Sun"){
        return false;
    }
    else{
        d3 = d2.toString().split(":");
        if (d3[0] <= 16 && d3[0] >= 7){
            if (d3[1] < 30){
                return true;
            }
            else{
                return false;
            }
        }
        
    }
}

function changePopup(){
    if (checkDate()){
        document.getElementById("myPopup_2").innerHTML = "We are Open<br><i style = \"font-size: 2rem; color:rgba(23, 190, 45, 0.7) !important;\"class=\"fas m-2 fa-clock\"></i>";
    }
    else{
        document.getElementById("myPopup_2").innerHTML = "We are Closed<br><i style = \"font-size: 2rem;\"class=\"fas m-2 fa-clock icon\"></i>";
    }
}

if(isTouchDevice()){
}
else{
checkDate();
document.getElementById("map-link").addEventListener("mouseleave", fadeOut_popup);
document.getElementById("email-div").addEventListener("mouseleave", fadeOut_popup_3);
document.getElementById("phone-div").addEventListener("mouseleave", fadeOut_popup_2);
document.getElementById("map-link").addEventListener("mouseover", fadeIn_popup);
document.getElementById("email-div").addEventListener("mouseover", fadeIn_popup_3);
document.getElementById("phone-div").addEventListener("mouseover", fadeIn_popup_2);

console.log("BLUEBLUE");

}