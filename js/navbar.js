var menu = document.getElementById("mainMenu_");

var menuHeight = document.getElementById("mainDiv_").offsetHeight;
document.getElementById("mainMenu_").style.top = menuHeight + "px";
console.log(menu);
var closed = true;
document.getElementById("menuDiv_").addEventListener("click", function(){
  menu.classList.toggle("open");
  if (menu.className.search("open") >= 0){
    menu.style.height = document.documentElement.clientHeight/1.6 + "px";
    
  }
  else{
    menu.style.height = 0;
    closed = true;
    console.log("HER");
  }
});

var mn = document.getElementById("menuDiv_");
mn.style.height = menuHeight + "px";