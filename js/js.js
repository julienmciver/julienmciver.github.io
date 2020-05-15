
//todo: fix viewbox arrows: make them permanent/fade after a small amount of time, and make them visible on mobile as well.
//todo: find a way to disable swiping the images on screen zoom. I am thinking: detect 2 finge inputs, draw a line where we have ((point1x - point2x)^2 + (point1y - point2y)^2)^0.5, which will give us a line starting point. we use this line as a benchmark, if we make the line reach that size again, then we assume we are fully zoomed out, and we enable scrolling again. This will be quite complicated.. but I can do it... Next update though

var page_size = 16; 
var pagecounter_height = 80;
var arrowHeight;
var pagecounter_offset;
var rowsPerPage = 4;
var noSwipes = 10;
var swipeDistance = 10;
var swipeBool = false;
var swipeFail = false;
var clickedBool_vb = false;
var frontPagePos;
var imagesSize = 8;
var prevState_vb;
var screenSize = document.documentElement.clientWidth;
var imagesAr = ["img\\rossImg\\002.jpg", "img\\rossImg\\2ff591a2-1f60-4be4-8969-a13b7201fd0e (1).JPG", "img\\rossImg\\003.jpg", "img\\rossImg\\004.jpg", "img\\rossImg\\006.jpg", "img\\rossImg\\6b54b811-1c0e-437a-aa2d-8c7948385c8e.JPG", "img\\rossImg\\008.jpg", "img\\rossImg\\009.jpg", "img\\rossImg\\010.jpg", "img\\rossImg\\011.jpg", "img\\rossImg\\016.jpg", "img\\rossImg\\018.jpg", "img\\rossImg\\23ef4678-6c25-42e2-8de0-1d0f83be4ae4 (1).JPG", "img\\rossImg\\024.jpg", "img\\rossImg\\025.jpg", "img\\rossImg\\026.jpg", "img\\rossImg\\a876f587-483a-452f-bae8-1a2230c6a045.JPG", "img\\rossImg\\b9f12aee-48ba-4de7-be08-eda131727256.JPG", "img\\rossImg\\b71943ce-873a-466c-9ba2-ee25491e13f8.JPG", "img\\rossImg\\e8af1905-5a4e-43d2-a212-eef80d7f96c0.JPG", "img\\rossImg\\f9462204-ec46-412a-a84f-336fdd725d45 (1).JPG", "img\\rossImg\\IMG_0009.JPG", "img\\rossImg\\IMG_0014.JPG", "img\\rossImg\\IMG_0015.JPG", "img\\rossImg\\IMG_0016.JPG", "img\\rossImg\\Photo0327.jpg", "img\\rossImg\\Photo0420.jpg", "img\\rossImg\\Photo0429.jpg", "img\\rossImg\\Photo0430.jpg", "img\\rossImg\\Photo0447.jpg", "img\\rossImg\\Photo0451.jpg", "img\\rossImg\\Photo0459.jpg", "img\\rossImg\\Photo0460.jpg", "img\\rossImg\\Photo0461.jpg", "img\\rossImg\\Photo0462.jpg", "img\\rossImg\\Photo0463.jpg", "img\\rossImg\\Photo0472.jpg", "img\\rossImg\\Photo0473.jpg", "img\\rossImg\\Photo0474.jpg", "img\\rossImg\\Photo0475.jpg", "img\\rossImg\\Photo0508.jpg", "img\\rossImg\\Photo0509.jpg", "img\\rossImg\\Photo0510.jpg", "img\\rossImg\\Photo0511.jpg", "img\\rossImg\\Photo0512.jpg", "img\\rossImg\\Photo0513.jpg", "img\\rossImg\\Photo0514.jpg", "img\\rossImg\\Photo0522.jpg","img\\rossImg\\Photo0523.jpg", "img\\rossImg\\Photo0614.jpg", "img\\rossImg\\Photo0616.jpg", "img\\rossImg\\Photo0624.jpg", "img\\rossImg\\Photo0625.jpg"];

var noPages;
var pageNo = 0;
var clickedBool = false;
function $(x){
    return document.getElementById(x);
}

//converts rem to pixels
function rem(x){
    return x*parseFloat(getComputedStyle(document.documentElement).fontSize);
}

var moveDirection_vb;
var arrows_vb;
function doArrows(){
    $("viewPort").style.display = "";
    let z = [$("leftArrow_vb"), $("rightArrow_vb")];
    z[0].style.display = "";
    z[1].style.display = "";
    let topcoord = $("viewBox").offsetHeight/2 - z[1].offsetHeight/2;
    console.log(z[0].offsetHeight + "topcoord");
    console.log(z + "HUH");
    z[0].style.left = "1rem";
    z[1].style.right = "1rem";
    z[0].style.top = topcoord + "px";
    z[1].style.top = topcoord + "px";
    console.log(z[0].style.position);
    /*
    if (document.documentElement.clientHeight > document.documentElement.clientWidth){
        $("image-counter").style.right = $("viewBox").offsetWidth/2 - $("image-counter").offsetWidth/2 + "px";
        console.log("BLUEBLBELUBELUBELUEBLUEBLUE");   
    }
    */
    $("viewPort").style.display = prevState_vb;
    
}





function updateImageCounter(){
    let t = imageNumber/1+1 + "/" + imagesAr.length;
    $("image-counter").innerHTML = t;
}

var imageNumber;
var tmr_vb;
var whichImage;
function leftArrowClicked_vb(){
    if (!clickedBool_vb && imageNumber != 0){
      clickedBool_vb = true;
      moveDirection_vb = 1;
      console.log("helllllllllllp");
      if (!swipeFail){
          imageNumber--;
          }
           updateImageCounter();
           arrows_vb[1].style.display = "";
           if (imageNumber == 0){
              arrows_vb[0].style.display = "none";
              
          }
           
 
           
           tmr_vb = setInterval(moveDivs_vb,20);
       }
      }
      
  

function rightArrowClicked_vb(){
    console.log("going in");
    if (!clickedBool_vb && imageNumber != imagesAr.length-1){  
    clickedBool_vb = true;
    arrows_vb[0].style.display = "";
  if (imageNumber != imagesAr.length-1){
      moveDirection_vb = -1;
     if (!swipeFail){
      imageNumber++;
  }
      updateImageCounter();
      arrows_vb[0].style.display = "";

      if (imageNumber == imagesAr.length-1){
          arrows_vb[1].style.display = "none";
      }
      tmr_vb = setInterval(moveDivs_vb,20);
      
  }
}
}

var touchStartCoord_vb;
var prevPos_vb;
var touchOffset_vb;

function endTouch_vb(){
    window.removeEventListener('scroll', noScroll);
    clearInterval(swipetime_keeper);
    let dist_moved = prevPos_vb - touchStartCoord_vb;
    let swipeThreshold = $("viewBox").offsetWidth*0.2;
    console.log(swipeThreshold + "SwipeThreashold");
   
    let speedRatio = Math.abs(swipetimer_/dist_moved);
    console.log(speedRatio + "Speedratio_vb");
    let imagecount = imagesAr.length;
    if (dist_moved == 0){}

    else if (((speedRatio <= 0.5)|| Math.abs(dist_moved) >= swipeThreshold) && (!(imageNumber == 0 && dist_moved > 0) && !(imageNumber == (imagecount-1) && dist_moved < 0))) {
        distance_temp_vb = distance_vb;
        
        console.log(dist_moved);
        distance_vb -= (Math.abs(dist_moved));
        if (dist_moved < 0){
                swipeBool = true;
                swipeFail = false;
                rightArrowClicked_vb();
                
            }
            else if (dist_moved > 0){
                swipeBool = true;
                swipeFail = false;
                leftArrowClicked_vb();
            }
            distance_vb = distance_temp_vb;
    }

    else if (((speedRatio > 0.5)||Math.abs(dist_moved) < swipeThreshold) || ((imageNumber == 0 && dist_moved > 0) || (imageNumber == (imagecount-1) && dist_moved < 0))){
        
        distance_temp_vb = distance_vb;
        distance_vb = (Math.abs(dist_moved));
        if (dist_moved < 0){
            swipeBool = true;
            swipeFail = true;
            leftArrowClicked_vb();
        }
        else if (dist_moved > 0){
            swipeBool = true;
            swipeFail = true;
            rightArrowClicked_vb();
            
            
        }
        distance_vb = distance_temp_vb;
    
    }
    
    swipetimer_ = 0;
    document.removeEventListener("touchend",endTouch_vb);    
}


var moveSpeed_vb;
var viewingPos;
function moveDivs_vb(){
    moveSpeed_vb = document.documentElement.clientWidth/10;
    var temp;
    var current_pos;
    var move_;
    let myboxes = document.getElementsByClassName("images-thing");
            
    for (i = 0; i < myboxes.length; i++){
        temp = "images-thing-" + i;
        let temp_el = $(temp);
   
        current_pos = temp_el.style.left.substr(0, temp_el.style.left.length - 2)/1;
        move_ = moveDirection_vb*moveSpeed_vb;
        
        current_pos += move_/1;
        
        
        temp_el.style.left = current_pos  + "px";    
     
        
    }
 
    var a;
    

    if (moveDirection_vb == -1){
    if (swipeFail){
        a = 1;
    }    
    else{
        a = 2;
    }
    if (myboxes[a].offsetLeft  <= viewingPos[0]){
        
        clearInterval(tmr_vb);
        repositionThings(myboxes,viewingPos,myboxes[2].src);
    
        clickedBool_vb = false;
        console.log("FALSE");
        if (swipeBool){
            distance_vb = distance_temp_vb;
            swipeBool = false;
            swipeFail = false;
        }
        
    }  
    }
    else if (moveDirection_vb == 1){
        if (swipeFail){
            a = 1;
        }
        else{
            a = 0;
        }
        if (myboxes[a].offsetLeft  >= viewingPos[0]){
            clearInterval(tmr_vb);
            repositionThings(myboxes,viewingPos,myboxes[2].src);
    
            if (swipeBool){
                distance_vb = distance_temp_vb;
                swipeBool = false;
                swipeFail = false;
            }

            
            clickedBool_vb = false;
            console.log("FASLE ");
        }   
    }
}


        
    
        function repositionThings(y, pos, source){
            
    if ("ontouchstart" in document.documentElement)
    {
        viewingPos = [0,0];
    }
            for (j = 0; j < y.length; j++){
                
                y[j].id = "tempId" + j;
            }
            for (i = 0; i < 3; i++){
                let nextPos = pos[0]/1 + (i-1)*distance_temp_vb/1;
                y[i].style.position = "absolute";
                y[i].style.left = nextPos + "px";
                y[i].style.top = pos[1] + "px";
                y[i].id = "images-thing-" + i;
                
                let index_ = imageNumber/1 + (i-1);
                    
                    y[i].src = imagesAr[index_];
                
                    y[i].style.opacity = 1;
                    
                   if (index_ == -1 || index_ == imagesAr.length){
                       y[i].style.opacity = 0;
                       
                   } 
                
                }

            }

function recalculate_thing(){
    
    $("viewPort").style.display = "";
    let newDim = $("viewBox").offsetWidth;
    console.log(newDim + "NEEEWDI");
    //distance_vb = newDivWidth/1 + imagevbwidth/3;
    let imgg = $("images-thing-0");
    console.log(imgg.offsetWidth + "HERE IS THE OFFSETWIDTH");
    distance_vb = newDim/1 + imgg/3;
    distance_temp_vb = distance_vb;
    
}

var counttt = 0;
function recalculateDistance_vb(){

    
    $("viewPort").style.display = "";

    let imageCounterr = $("image-counter");
    if (document.documentElement.clientHeight > document.documentElement.clientWidth){
        
        imageCounterr.style.right = $("viewBox").offsetWidth/2 - imageCounterr.offsetWidth/2 + "px";
    }
    else {
    imageCounterr.style.right = "1rem";
    }
    $("viewPort").style.display = prevState_vb;



}






function clickAway(){
    $("stage-div").style.display = "none";
    $("background-div").style.display = "none";
    document.removeEventListener("click", clickAway);
}
var touchStartCoord;
var touchOffset;
var prevPos;

function touchStartEvent(){
    document.addEventListener("touchmove", touchMoveEvent);
    document.addEventListener("touchend", touchEndEvent);
    touchStartCoord = Touch.clientX;
    
    
    prevPos = touchStartCoord;
    touchOffset = touchStartCoord - event.target.getBoundingClientRect().left;
}

var scroll_;
function noScroll() {
    window.scrollTo(scroll_, scroll_);
  }
  
  function noScroll2(elem1) {
    elem1.scrollTo(0, 0);
  }
  

 var swipetimer_ = 0; 
function timecount(){
    swipetimer_++;
}



var swipetime_keeper;
var swipetime_switch;
var distance_temp;
function endTouch(){
    window.removeEventListener('scroll', noScroll);
    notswipingyet = true;
    clearInterval(swipetime_keeper);
    var dist_moved = prevPos - touchStartCoord;
    let swipeThreshold = $("content-box").offsetWidth*0.2;
   
    let speedRatio = Math.abs(swipetimer_/dist_moved);
   
    if (dist_moved == 0){//here is a horse
    }

    else if (((speedRatio <= 0.5)||Math.abs(dist_moved) >= swipeThreshold) && (!(pageNo == 0 && dist_moved > 0) && !(pageNo == (noPages-1) && dist_moved < 0))) {
        distance_temp = distance;
    
        distance -= (Math.abs(dist_moved));
        if (dist_moved < 0){
                swipeBool = true;
                rightArrowClicked();
                
            }
            else if (dist_moved > 0){
                swipeBool = true;
                leftArrowClicked();
            }
        
    }

    else if (((speedRatio > 0.5)||Math.abs(dist_moved) < swipeThreshold) || ((pageNo == 0 && dist_moved > 0) || (pageNo == (noPages-1) && dist_moved < 0))){
        
        distance_temp = distance;
        distance = (Math.abs(dist_moved));
        if (dist_moved < 0){
            swipeBool = true;
            swipeFail = true;
            console.log(dist_moved + " < 0");
            leftArrowClicked();
        }
        else if (dist_moved > 0){
            swipeBool = true;
            swipeFail = true;
            rightArrowClicked();
            
            
        }
    
    }
    
    swipetimer_ = 0;
    document.removeEventListener("touchend",endTouch);
    

}
var verticalMove;
var notswipingyet = true;
function addimagesBoxSwipeEventListeners(){
    var x = document.getElementsByClassName("images-box");
    var m = document.getElementsByClassName("images-thing");
    for (j = 0; j < m.length; j++){
        
        m[j].addEventListener("touchstart", function(q){
            document.addEventListener("touchend", endTouch_vb);
            window.addEventListener("scroll", noScroll);
            swipetime_switch = true;
            scroll_ = window.scrollY;
            if (swipetime_switch){
                swipetime_keeper = setInterval(timecount, 10);
                swipetime_switch = false;
            }
            touchStartCoord_vb = q.touches[0].clientX;
            prevPos_vb = touchStartCoord_vb;
            touchOffset_vb = event.target.getBoundingClientRect().left - touchStartCoord_vb;
        }, false);
        m[j].addEventListener("touchmove", function(w){
            
            

            let currentPos = w.touches[0].clientX;
            
            
            for (z = 0; z < m.length; z++){
                let x_left = numerate(m[z].style.left,2)/1;
                x_left += (currentPos/1 - prevPos_vb/1);
                m[z].style.left = x_left + "px";
            }
            prevPos_vb = currentPos;
        }, false);
    }


        for (i = 0; i < x.length; i++){
            
            x[i].addEventListener("touchstart", function(e) {
                document.addEventListener("touchend", endTouch);
                swipetime_switch = true;
                scroll_ = window.scrollY;
            // add listener to disable scroll
            
            if (swipetime_switch){
                swipetime_keeper = setInterval(timecount, 10);
                swipetime_switch = false;
            }
            touchStartCoord = e.touches[0].clientX;
            verticalMove = e.touches[0].clientY;
           
            prevPos = touchStartCoord;
            touchOffset = event.target.getBoundingClientRect().left - touchStartCoord;
        }, false);
        x[i].addEventListener("touchmove", function(f){

            
            let vertPos = f.touches[0].clientY;
            let currentPos = f.touches[0].clientX;
            if (Math.abs(currentPos - touchStartCoord) >= document.documentElement.clientWidth*0.1){
                notswipingyet = false;
            } 

                if (!notswipingyet){
               
               
                for (j = 0; j < x.length; j++){
                let x_left = numerate(x[j].style.left,2)/1;
                x_left += (currentPos/1 - prevPos/1);
                x[j].style.left = x_left + "px";
            }
            prevPos = currentPos;
        }
        }, false);
        
    }

}

var image_div_ar = [];

var images_per_row;
//var width_images;
var pictures_per_page;
function calc_pages(){
    imagesSize = 8;
     let no_images = imagesAr.length;
    let inner_width =  $("content-box").offsetWidth - 2*($("left-arrow").offsetWidth) - rem(0.2);
   
    //two max values, that will be changed after this.
     images_per_row = 5;
     rowsPerPage = 4;
    let whileswitch = false;
     while ((images_per_row * imagesSize * parseFloat(getComputedStyle(document.documentElement).fontSize) > inner_width) && (!whileswitch)){
        if (images_per_row > 3)
        images_per_row--;
        
        if ((images_per_row == 3) && ((images_per_row * imagesSize * parseFloat(getComputedStyle(document.documentElement).fontSize) > inner_width))){
            
            while ((((images_per_row * imagesSize * parseFloat(getComputedStyle(document.documentElement).fontSize) > inner_width))) && (!whileswitch)){
                   imagesSize -= 0.2; 
                   if (imagesSize < 4){
                    images_per_row--;
                    whileswitch = true;
                   }
            }
        }
      
    }
    
    

    let rowIndex = 10 - images_per_row;
    rowsPerPage = rowIndex;
    if (rowsPerPage < 5){
        rowsPerPage = 5;
    }

    pictures_per_page = images_per_row*rowsPerPage;
    let no_pages = Math.ceil(no_images/pictures_per_page);
   return no_pages;
 
 }

var timer_ = 0;
var pausetime = 5;
function wait(){
timer_++;
if (timer_ == pausetime){
    clearInterval(swipeTimer);
    timer_ = 0;
}
}

function numerate(val, digits){
    return (val.substr(0, val.length - digits));
}

function px2em(px, elem) {
    let font_ = numerate(window.getComputedStyle(elem.parentNode).fontSize,2);
    return px/font_;
}


function calcCos(){
    let rad_ = Math.PI/180; //1 degree in radians
    let radians = 90*rad_;
    
}

function moveArrows(degrees, direction){
    let left_ = $("leftArrow_sg");
    let right_ = $("rightArrow_sg");
    let leftArPos = left_.offsetLeft;
    let rightArPos = right_.offsetLeft;
    leftArPos += direction*2;
    left_.style.left = leftArPos + "px";
    rightArPos += direction*2;
    right_.style.left = rightArPos + "px";
}


    var currentRot = 0;
    var swipes = 0;
    var direction = -1;
    var aniSwitch = false;
    var swipeTimer;
    var swipeCount = 0;
  
    function rotate(){
    
        currentRot += 0.5*direction;
        let x = $("hand");
        x.style.transform = "rotate(" + currentRot + "deg)";
        moveArrows(currentRot,direction);
        if ((Math.abs(currentRot) >= swipeDistance)){
            let ref = (currentRot/Math.abs(currentRot))*swipeDistance;
            x.style.transform = "rotate(" + ref + "deg)";
            if (direction == 1){
                swipes++;
            }
            direction *= -1;
        }
 
        if (swipes == noSwipes){
            if ((Math.abs(currentRot) >= 0)){
                x.style.transform = "rotate(" + 0 + "deg)";
                clearInterval(swipeTimer);
                swipes = 0;
                currentRot = 0; 
                direction = -1;
                if (swipeCount != 3){
                    swipes++
                    swipeTimer = setInterval(rotate, 20);
                }
        }
        
    }
    }
    
var direc = 1;
var swipeTime = 0;
var swipeAni_tmr;
    
var stageDiv_point = "stage-div";
 var swipeswitch = false;
    
    function makeSwipeAnimation(){   
        if (!swipeswitch){
            let stageDiv = document.createElement("div");
            stageDiv.className = "stage";
            stageDiv.classList.add("createdItem");
            //stageDiv.style.backgroundColor = "green";
            stageDiv.id = "stage-div";
            let swipeDiv = document.createElement("div");
        

            swipeDiv.classList.add("swipe");
            swipeDiv.classList.add("createdItem");
            stageDiv.appendChild(swipeDiv);
            swipeDiv.id = "swipe-div";

            let leftArrow = document.createElement("div");
            leftArrow.classList.add("createdItem");
            leftArrow.id = "leftArrow_sg";

            let leftAr = document.createElement("i");
            leftAr.classList.add("createdItem");
            leftAr.classList.add("fa");
            leftAr.classList.add("fa-long-arrow-left");
            leftArrow.appendChild(leftAr);
            swipeDiv.appendChild(leftArrow);

            let handDiv = document.createElement("div");
            handDiv.classList.add("createdItem");
            handDiv.id = "hand";

            let hand = document.createElement("i");
            hand.classList.add("createdItem");
        hand.id = "handId";
        hand.classList.add("fa");
        hand.classList.add("fa-hand-o-up");
        handDiv.appendChild(hand);
        swipeDiv.appendChild(handDiv);
        
        let rightArrow = document.createElement("div");
        rightArrow.classList.add("createdItem");
        let rightAr = document.createElement("i");
        rightAr.classList.add("createdItem");
        rightAr.classList.add("fa");
        rightAr.classList.add("fa-long-arrow-right");
        rightArrow.appendChild(rightAr);
        swipeDiv.appendChild(rightArrow);
        rightArrow.id = "rightArrow_sg";

        //styles
        swipeDiv.style.width = 100 + "%";
        swipeDiv.style.height = 70+ "%";
        swipeDiv.style.display = "flex";
        swipeDiv.style.justifyContent = "center";
        swipeDiv.style.alignItems = "center";
    
        rightArrow.style.position = "absolute";
        rightArrow.style.top = 0.2 + "em";
        rightArrow.style.left = 2.9 + "em";
        rightArrow.style.fontSize = "2rem";
        leftArrow.style.position = "absolute";
        leftArrow.style.top = 0.2 + "em";
        leftArrow.style.left = 0.93 + "em";
        leftArrow.style.fontSize = "2rem";


        handDiv.style.fontSize = 4 + "em";
        handDiv.style.position = "absolute";
         handDiv.style.height = 4 + "em";

        let swipeText = document.createElement("div");
        swipeText.classList.add("createdItem");
        swipeText.innerHTML = "Swipe to Navigate";
        stageDiv.appendChild(swipeText);
       swipeText.style.position = "absolute";
        swipeText.style.top = 6 + "em";

        $("page-top").appendChild(stageDiv);
        
        handDiv.style.top = 0.12 + "em";
        //make a background div for contents box.
        let backgroundDiv = document.createElement("div");
        backgroundDiv.classList.add("createdItem");
        backgroundDiv.style.width = 100 +"%";
        backgroundDiv.style.height = 100 + "%";
        backgroundDiv.style.backgroundColor = "rgba(0,0,0,0.9)";
        backgroundDiv.style.position = "absolute";
        backgroundDiv.style.top = 0;
        backgroundDiv.style.left = 0;
        $("content-box").appendChild(backgroundDiv);
        backgroundDiv.id = "background-div";
        
        

        stageDiv.style.width = 10 + "rem";
        stageDiv.style.height = 10 + "rem";
        stageDiv.style.position = "fixed";
        stageDiv.style.top = 50 + "vh";
        stageDiv.style.textAlign = "center";
        stageDiv.style.left = document.documentElement.clientWidth/2 - stageDiv.offsetWidth/2 + "px";
        stageDiv.style.opacity = 0;
        
        swipeText.style.left =(stageDiv.offsetWidth - swipeText.offsetWidth)/2 + "px";
        //okay, time to animate the swipe animation.
    
        //NB: learn to animate with css, it will save you so much time. Enjoy animating this in JS though, it will be fun.
        swipeAni_tmr = setInterval(fadeSwipe, 50);
        swipeTimer = setInterval(rotate, 20);
        swipeswitch = true;
        document.addEventListener("click", clickAway);
    }
    }
    

    function fadeSwipe(){
    
        var backDiv = $("background-div");
    
        var x = $(stageDiv_point);
        var y = x.style.opacity/1;
        y += 1/25*direc;
        if (direc == -1){
            
                backDiv.style.opacity = y;    
            
        }
        if (y <= 0){
            y = 0;
            clearInterval(swipeAni_tmr);
            clearInterval(swipeTimer);
            direc = 1;
            backDiv.style.display = "none";
            $("stage-div").style.display = "none";
            document.removeEventListener("click", clickAway);
            //console.log(y);
            
        }
        else if (y >= 1){
            y = 1;
        }
        x.style.opacity = y;
    
        if (y == 1){
            swipeTime++;
            direc = 0;
            if (swipeTime == 5){
                direc = -1;
                clearInterval(swipeAni_tmr);
              swipeAni_tmr = setInterval(fadeSwipe,30);
                swipeTime = 0;
                
            }
        }
    }
    

function gotoPage(){
    let noImageBoxes = document.getElementsByClassName("images-box");
    for (i = 0; i < noImageBoxes.length; i++){
        let temp = "images-box-" + i;
        let currentPos = $(temp).offsetLeft;
        let newPos = currentPos - distance*pageNo;
        $(temp).style.left = newPos + "px";
    }
}

function checkParentbyClass(elem ,class_name){
    
    var els = [];  
    while (elem) {
    els.unshift(elem);
    
    elem = elem.parentNode;
    if (elem == undefined){
        continue;
    }
    if (elem.classList.contains(class_name)){
        return true;
    }
}
return false;
}


function deleteAll(class_name){
    

    let createdItems = document.getElementsByClassName(class_name);
    var errorCount = 0;
   while (createdItems.length > 0){
    for (i = 0; i < createdItems.length; i++){
        if (createdItems[i].childElementCount <= 0){
            createdItems[i].parentNode.removeChild(createdItems[i]);
            
        }
        
    }
    
    errorCount++;
    if (errorCount >500){
        break;
    }
}

}


function resize(){
    let newSize = document.documentElement.clientWidth;
    if (newSize != screenSize){
        screenSize = newSize;
        noPages = calc_pages();
        
        if (pageNo > noPages) pageNo = noPages-1;
    arrows[0].style.position = "static";
    arrows[1].style.position = "static";
    arrows[0].style.display = "";
    arrows[1].style.display = "";
    arrow[0].style.display = "";
    arrow[1].style.display = "";
    let arrows_ = document.getElementsByClassName("arrow-container");
        for (i = 0; i < arrows_.length; i++){
            arrows_[i].style.display = "";
         
        }
        
    thisswitch = false;
    clearInterval(swipeTimer);
    clearInterval(swipeAni_tmr);


    deleteAll("createdItem");

    
    window.removeEventListener("resize", resize);
    window.removeEventListener("scroll",showthing);
    
    createGallery();
    showthing();
    }
}



function createImage_box(){
    //so this bad boy will create an element with id images-box-<i>. adding images-divs and rows will come after
        var newDiv = document.createElement("div");
        newDiv.classList.add("createdItem");
        newDiv.classList.add("images-box");
        return newDiv;
   }//creating pages


   //append rows into image-boxes
    function make_pages(rows){
        let c = 0;
        let x = [];
        for (i = 0; i < noPages; i++){
            x[i] = createImage_box();
            x[i].id = ("images-box-" + i);
            for (j = 0; j < rowsPerPage; j++){
                x[i].appendChild(rows[c]);
                x[i].style.position = "absolute";
                c++;
            }
        }

        append_to_main_window(x);
     
    }
function append_to_main_window(pages){
    //take each image-box, and append that to the contents box
    let main_ = $("content-box");
    for (i = 0; i < noPages; i++){
        main_.appendChild(pages[i]);
    }
}


   function createRow(){ //rows have x image divs and an img in each.
    //okay, so I need to recall how to create a div, refer to top.
    var newDiv = document.createElement("div");
    newDiv.classList.add("createdItem");
    newDiv.classList.add("img-row");
    return newDiv;
   }

   //now for a function that makes images

   function createImg_div(){
       var newDiv = document.createElement("div");
       newDiv.classList.add("image-div");
       newDiv.classList.add("createdItem");

       if ("ontouchstart" in document.documentElement && document.documentElement.clientWidth < 366)
    {
    }
    else if ("ontouchstart" in document.documentElement && document.documentElement.clientWidth > 366){

    
    }   
    return newDiv;

   }

   function makeImg(){
       var newDiv = document.createElement("img");
       newDiv.classList.add("createdItem");
       newDiv.classList.add("image");
       return newDiv;
   }


   function roundCorners(){
       //takes the number of rows, and the images per row, and calculates which divs need to have rounded corners, and which corners need to be rounded - doing this for future erm.. update.       
   }

   function make_image_divs(){
    //will make an image-div for each image in the array
    
    for (i = 0; i <imagesAr.length; i++){
        
        image_div_ar[i] = createImg_div();
        image_div_ar[i].style.width = imagesSize + "em";
        image_div_ar[i].style.height = imagesSize + "em";
        var img = makeImg();
        img.id = "thumb-" + i;
        image_div_ar[i].appendChild(img);
        
        
    }

    
}

function append_img_divs_to_rows(rows){
    
    let c = 0;
    rows.length
    for (i = 0; i < rows.length; i++){
            
        for (j = 0; j < images_per_row; j++){
                if (c < image_div_ar.length){    
                      
                    rows[i].appendChild(image_div_ar[c]);
                    c++; //(woop woop)

                }
            }
    }
        //here I will make some pages.
        make_pages(rows);
}


function createRows(){
    
    var x = [];
    for (i = 0; i < noPages*rowsPerPage; i++){
        x[i] = document.createElement("div");
        x[i].classList.add("img-row");
        x[i].classList.add("createdItem");

    }
    append_img_divs_to_rows(x);
    }



   function image_in_div(){
    for (i = 0; i < image_div_ar.length; i++){
        let img = makeImg();
        img.id = ("thumb-" + i);
        image_div_ar[i].appendChild(img);
    }
    

}    

   //this is to make an images-box
  
   function addPageCounter(parent){
    let newDiv = document.createElement("div");
    newDiv.classList.add("createdItem");
    newDiv.style.color = "rgba(255,255,255, 0.7)";
    newDiv.style.fontSize = "1rem";
    newDiv.style.display = "inline-flex";
    newDiv.style.width = "4rem";
    newDiv.style.height = "4rem";
    newDiv.style.position = "fixed";
    parent.appendChild(newDiv);
    newDiv.style.justifyContent = "center";
    newDiv.style.justifyItems = "center";
    newDiv.style.alignContent = "center";
    newDiv.style.alignItems = "center";

    //position itself in the middle of its parent element:
    let xCoord = parent.offsetLeft + parent.offsetWidth/2 - newDiv.offsetWidth/2;
    newDiv.style.left = xCoord + "px";
    newDiv.style.top = pagecounter_height + "vh";
    pagecounter_offset = newDiv.getBoundingClientRect().bottom;
    newDiv.style.backgroundImage = "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.8))";
    newDiv.style.borderRadius = "50%";


    newDiv.id = "page-counter";
    newDiv.style.pointerEvents = "none";
    newDiv.innerHTML = pageNo+1 + "/" + noPages;
}

function updatePageCounter(){
    $("page-counter").innerHTML = pageNo+1 + "/" + noPages;
}

   var arrows = document.getElementsByClassName("arrow-div");

   function positionImageBoxes(){

        let elem = $("images-box-0");
        let arrow = $("left-arrow");
        elem.style.top = arrow.offsetTop.top + "px";
        elem.style.left = arrow.offsetLeft + arrow.offsetWidth/1 + "px";
        let x = ($("right-arrow").offsetLeft/1 - (elem.offsetLeft + elem.offsetWidth))/2;
        let newString = elem.style.left.substr(0, elem.style.left.length - 2);
        newString = newString/1 + x;
        elem.style.left = newString + "px";
        
let temp = "";
distance = Math.ceil($("content-box").offsetWidth +$("content-box").offsetWidth/2);

if (distance %2 != 0){
    distance++;
}
galleryPos = elem.style.left.substr(0, elem.style.left.length - 2);
    for (i = 1; i < noPages; i++){
        temp = "images-box-" + i;
        $(temp).style.left = (galleryPos/1 + i*distance/1) + "px";
    }
    
    frontPagePos = $("images-box-0").offsetLeft;
    
   
}
distance_temp = distance;

var root_elem = 
    Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0]);
    
function setContentsBox(){
    let elem_main = $("content-box");
    let elem_2 = $("images-box-0");
    
    let x = elem_2.getBoundingClientRect().height;
    x+= root_elem*2; 
    x+= 6;

     elem_main.style.height = x + "px";

     let c = document.getElementsByClassName("images-box");
     c[c.length-1].style.height = c[0].offsetHeight + "px";
     c[c.length-1].style.width = c[0].offsetWidth + "px";
}





   function assignImages(){
    let thumbVar = 0;
    let whichRef = 0;
    let stringTemp;
        for (i = 0; i < imagesAr.length; i++){
        let images = image_div_ar[i].childNodes[0];
        
        images.src = imagesAr[i];
        images.style.display = "initial";
        
    }
}




var moveDirection;
var whichPage;
var distance;

function fixMoveSpeed(){
    let content_box_width = $("content-box").offsetWidth;
    moveSpeed = content_box_width/6;
}


function calcViewBoxPerc(){
    let viewBoxDim = [$("viewBox").offsetWidth, $("viewBox").offsetHeight];
    let midVals = [viewBoxDim[0]/2, viewBoxDim[1]/2];
    let browserDim = [document.documentElement.clientWidth,document.documentElement.clientHeight];
    let percentageOffset = [(midVals[0]/browserDim[0])*100,(midVals[1]/browserDim[1])*100];
  
    return percentageOffset;
}


//add a cross to the top right corner of the viewbox
function addCross(viewBox){
    let newDiv = document.createElement("div");
    
    let fa = document.createElement("i");
    
    newDiv.style.color = "rgba(255,255,255, 0.3)";
    
    fa.classList.add("fas");
    fa.classList.add("fa-times-circle");
    fa.id = "escape-cross";
    newDiv.appendChild(fa);
    newDiv.style.fontSize = "2.5rem";
    
    newDiv.style.display = "inline-flex";
    newDiv.style.position = "absolute";
    newDiv.style.justifyContent = "center";
    newDiv.style.alignContent = "center";
    newDiv.style.alignItems = "center";
    newDiv.style.top = "1rem";
    newDiv.style.right = 1 + "rem";
    
    viewBox.appendChild(newDiv);
}


    //add arrows to the viewBox

var viewBoxBool;
var viewBoxCreated = false;
function viewBoxDiv(){
    if (!viewBoxCreated){
    viewBoxBool = true;
    let backGroundDiv = document.createElement("div");
    
    
    backGroundDiv.style.position = "absolute";
    backGroundDiv.style.width = 100 + "%";
    
    backGroundDiv.style.height = document.body.offsetHeight + "px";
    backGroundDiv.style.top = 0;
    backGroundDiv.style.left = 0;
    backGroundDiv.style.backgroundImage = "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.8))";
    backGroundDiv.id = "viewPort";
    backGroundDiv.classList.add("viewPort");
    document.body.appendChild(backGroundDiv);
    let newDiv = document.createElement("div");
    console.log(backGroundDiv.offsetWidth + " This is it boys we are going to the festics");
    var viewPortWidth = backGroundDiv.offsetWidth;
    newDiv.id = "viewBox";
    newDiv.style.position = "relative";
    backGroundDiv.appendChild(newDiv);
    
    
    newDiv.style.position = "fixed";
    newDiv.style.width = "80%";
    let newDivWidth = newDiv.offsetWidth;
    newDiv.style.height = 80 + "%";
    let imgDiv1 = document.createElement("img");
    let imgDiv2 = document.createElement("img");
    let imgDiv3 = document.createElement("img");
    newDiv.appendChild(imgDiv1);
    newDiv.appendChild(imgDiv2);
    newDiv.appendChild(imgDiv3);
    
    imgDiv1.style.width = 100 + "%";
    let imagevbwidth = imgDiv1.offsetWidth;
    imgDiv1.style.height = 100 + "%";
    imgDiv1.style.objectFit = "contain";
    imgDiv1.id = "images-thing-0";
    imgDiv1.classList.add("images-thing");

    imgDiv2.style.objectFit = "contain";
    imgDiv2.id = "images-thing-1";
    imgDiv2.style.width = 100 + "%";
    imgDiv2.style.height = 100 + "%";
    imgDiv2.classList.add("images-thing");
    
    imgDiv3.style.objectFit = "contain";
    imgDiv3.id = "images-thing-2";
    imgDiv3.style.width = 100 + "%";
    imgDiv3.style.height = 100 + "%";
    imgDiv3.classList.add("images-thing");
    
    
    
    imgDiv1.src = imagesAr[img_index];
    newDiv.style.border = "double rgb(190, 23, 23, .4)";
    newDiv.style.backgroundColor = "rgba(0,0,0,0.7)";
    newDiv.style.padding = "1rem";
    let offset = calcViewBoxPerc();
    
    let hVal = 50 - offset[0];
    let mainNav = $("mainNav").offsetHeight;
    let vertDist = (document.documentElement.clientHeight - 20 - mainNav - newDiv.offsetHeight)/2;
    let mainNavOffset = ((mainNav + vertDist )/document.documentElement.clientHeight)*100;
    newDiv.style.left = hVal + "%";
    newDiv.style.top = 50 - (((newDiv.offsetHeight/2)/document.documentElement.clientHeight)*100) + "%";
    newDiv.classList.add("viewBox");
    addCross(newDiv);
    addViewBoxArrows(newDiv);
    backGroundDiv.style.display = "none";
    viewBoxCreated = true;
    imageNumber = 0;

distance_vb = newDivWidth/1 + imagevbwidth/3;
distance_temp_vb = distance_vb;

viewingPos = [imgDiv1.offsetLeft, imgDiv1.offsetTop];
let x = [imgDiv1,imgDiv2, imgDiv3];
repositionThings(x, viewingPos,imgDiv1);

var imageCounter = document.createElement("div");
newDiv.appendChild(imageCounter);
imageCounter.id = "image-counter";
imageCounter.style.pointerEvents = "none";
console.log(imageCounter);
/*
if (document.documentElement.clientHeight > document.documentElement.clientWidth){
    backGroundDiv.style.display = "";
    console.log(imageCounter.offsetWidth  + "WIDTH");
    imageCounter.style.right = $("viewPort").offsetWidth/2 - imageCounter.offsetWidth/2 + "px";
    backGroundDiv.style.display = "";
    
}
*/

    if ("ontouchstart" in document.documentElement)
    {
        newDiv.style.height = 100 + "vh";
        newDiv.style.width = 100 + "vw";
        newDiv.style.top = 0;
        newDiv.style.left = 0;
        newDiv.style.border = "double 0.45rem rgb(190, 23, 23, .4)";
    }
    }





    if(viewBoxCreated){
        $("viewPort").style.display = "";
        let g = document.getElementsByClassName("images-thing");
    
    distance_vb = $("viewBox").offsetWidth/1 + g[0].offsetWidth/3;
    console.log($("viewBox").offsetWidth + "FFS");
    distance_temp_vb = distance_vb;
    viewingPos = [g[1].offsetLeft, g[1].offsetTop];
    console.log(distance_vb + "Distance_VB AGAIN");
    repositionThings(g, viewingPos,g[1]);
    $("viewPort").style.display = prevState_vb;
    }

    
    
}

function fadeBoxIn(){
    let x = $("viewPort").style.opacity/1;
    let y = $("mainNav").style.opacity/1;
    y -= (1/25);
    x += (1/25);
    $("viewPort").style.opacity = x;
    $("mainNav").style.opacity = y;
    
    if (x >= 1){
        $("viewPort").style.opacity = 1;
        $("mainNav").style.opacity = 0;
        
    $("mainNav").style.display = "none";
        clearInterval(time);
    }
     
}

function fadeBoxOut(){
    let y = $("mainNav").style.opacity/1;
    y += (1/25);
    $("mainNav").style.opacity = y;
    
    let x = $("viewPort").style.opacity/1;
    x -= 1/25;
    
  $("viewPort").style.opacity = x;
    if (x <= 0){
        $("viewPort").style.opacity = 0;
        clearInterval(time);
        $("viewPort").style.display = "none";
        $("mainNav").style.opacity = 1;
        
   
    prevState_vb = "none";

    
        
    } 
}
var time;

function fadeBoxInt(){
   //remove event listeners for bool and for click
  
   $("viewBox").removeEventListener("mouseenter", toggleViewPortBool);
   $("viewBox").removeEventListener("mouseleave", toggleViewPortBool);
   $("viewBox").removeEventListener("mouseover", fadein_timr_vb);
   $("viewBox").removeEventListener("mouseout", fadeout_timr_vb);

    if (viewBoxBool){
        $("viewPort").removeEventListener("click", fadeBoxInt);
  
        $("mainNav").style.display = "";
        time = setInterval(fadeBoxOut, 10);
    }
    else if (event.target.id == "escape-cross"){
        $("viewPort").removeEventListener("click", fadeBoxInt);      
        $("mainNav").style.display = "";
        toggleViewPortBool();
        time = setInterval(fadeBoxOut, 10);
        
    }

}

function toggleViewPortBool(){
    viewBoxBool = !viewBoxBool;

}



    var img_index = 0;
    var viewing = false;
    function imageClicked(){
        if (!clickedBool){
        $("viewPort").style.display = "";
        $("viewBox").addEventListener("mouseenter", toggleViewPortBool);
        $("viewBox").addEventListener("mouseleave", toggleViewPortBool);
        time = setInterval(fadeBoxIn, 10);
        img_index = getPicIndex(event.target.id);
        imageNumber = img_index;
        $("rightArrow_vb").style.display = "";
        $("leftArrow_vb").style.display = "";
       
        updateImageCounter();

        if (img_index/1 == 0){
            $("rightArrow_vb").style.display = "";
            $("leftArrow_vb").style.display = "none";
            $("images-thing-2").src = imagesAr[img_index/1+1];  

        }
        else if (img_index/1 == imagesAr.length-1){
            $("rightArrow_vb").style.display = "none";
            $("leftArrow_vb").style.display = ""; 
            
            $("images-thing-0").src = imagesAr[img_index/1-1];
        }  
        else{
            
        $("images-thing-0").src = imagesAr[img_index/1-1];
        $("images-thing-2").src = imagesAr[img_index/1+1];
        }
        $("images-thing-1").src = imagesAr[img_index];
        $("viewPort").addEventListener("click", fadeBoxInt);
        
        $("rightArrow_vb").addEventListener("click", rightArrowClicked_vb);
        $("leftArrow_vb").addEventListener("click", leftArrowClicked_vb);
        
        prevState_vb = "";
    }
    }


    document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow
       leftArrowClicked_vb();
       
    }
    else if (e.keyCode == '39') {
       // right arrow
       rightArrowClicked_vb();
       
    }

}

    function addImageEventListeners(){
        let x = document.getElementsByClassName("image");
        for (i = 0; i < x.length; i++){
            x[i].addEventListener("click", imageClicked);
        }
    }
    

     //next picture on the viewbox:

    function addViewBoxArrows(viewBox){
        let rightArrow = document.createElement("div");
        
        let rightArrowContainer =document.createElement("div");
        rightArrowContainer.classList.add("arrow-container");
        rightArrowContainer.appendChild(rightArrow);
        let leftArrow = document.createElement("div");
        let leftArrowContainer = document.createElement("div");
        
        leftArrowContainer.appendChild(leftArrow);
        leftArrow.style.cursor = "pointer";
        rightArrow.style.cursor = "pointer";
        leftArrow.id = "leftArrow_vb";
        rightArrow.id = "rightArrow_vb";
        leftArrowContainer.classList.add("arrow-container");
        rightArrow.classList.add("viewbox-fade");
        let faLAr = document.createElement("i");
        let faRAr = document.createElement("i");
        
        faLAr.classList.add("fas");
        faLAr.classList.add("fa-angle-left");
        faRAr.classList.add("fas");
        faRAr.classList.add("fa-angle-right");
        faLAr.id = "vblArrow";
        faRAr.id = "vbrArrow";
        
        rightArrow.appendChild(faRAr);
        leftArrow.appendChild(faLAr);
        leftArrow.style.position = "absolute";
        rightArrow.style.position = "absolute";
        leftArrow.style.fontSize = 6  + "rem";
        rightArrow.style.fontSize = 6  + "rem";
        leftArrow.style.color = "rgba(255,255,255, 0.5)";
        rightArrow.style.color = "rgba(255,255,255, 0.5)";
        viewBox.appendChild(rightArrowContainer);
        viewBox.appendChild(leftArrowContainer);
        let temp_img_string = "images-thing-0"
        let img = $(temp_img_string);
        img.src = imagesAr[0];
        let ArrowOffset_height =  img.offsetHeight/2 - leftArrow.offsetHeight/2;
        leftArrow.style.top = ArrowOffset_height + "px";
        console.log(leftArrow.offsetHeight + " WHY ISn");
        prevState_vb = "none";
        
        let leftImg_offset = (img.offsetLeft - viewBox.offsetLeft)/2  - leftArrow.offsetWidth/2; 
         
    
        arrows_vb = [leftArrow, rightArrow];
    }

     function getPicIndex(x){

        let str = x.indexOf("-");
        let y = x.substr(str+1, x.length);
    
        return y;
     }


     /* ************************************ 
     Pic transition section
     ****************************************/
     
     //added event listeners to imageclicked()
     var img_switch = true;
     var time_vb;

     function imagechange_fade(inp){
        clearInterval(time_vb);
        
        if (inp == 1) {
            img_switch = true;
        }
        else if (inp == 0){
            img_switch = false;
        }
            time_vb = setInterval(fadeout_vb_img, 0.5);
     }

     function fadein_vb_img(){
        let imageThings = document.getElementsByClassName("image-things");
        let opac = $("image-things-0").style.opacity/1;
        
        opac += 1/25;
       for (i = 0; i < imageThings.length; i++){
           imageThings[i].style.opacity = opac;
       } 
        
        if (opac >= 1){
            for (j = 0; j < imageThings.length; j++){
                imageThings[i].style.opacity = 1;
            } 
             
            clearInterval(time_vb);
            
        }
     }

     function fadeout_vb_img(){
        let imageThings = document.getElementsByClassName("image-things");
        let opac = $("image-things-0").style.opacity/1;
        
        opac -= 1/25;
       for (i = 0; i < imageThings.length; i++){
           imageThings[i].style.opacity = opac;
       } 
        
        if (opac <= 0){
            for (j = 0; j < imageThings.length; j++){
                imageThings[i].style.opacity = 0;
            } 
             
            clearInterval(time_vb);
            
        }
     }


     //******arrow fadeouts */
     var ar_timr;
     function fadein_timr_vb(){
        clearInterval(ar_timr);
         ar_timr = setInterval(fade_ar_in_vb,5);
     }

     function fadeout_timr_vb(){

        clearInterval(ar_timr);
         ar_timr = setInterval(fade_ar_out_vb, 5);
     }

     function fade_ar_in_vb(){
        
        let elems = document.getElementsByClassName("viewbox-fade");
        let x = elems[0].style.opacity/1;
        
        for(i = 0; i < elems.length; i++){
        x += (1/25);
        elems[i].style.opacity = x;
        }

        if (x <= 0){
            $("leftArrow_vb").style.opacity = 0;
            $("rightArrow_vb").style.opacity = 0;
            if ("ontouchstart" in document.documentElement)
            {
                 $("escape-cross").style.opacity = 0;
            }
                 clearInterval(ar_timr);
        }
    }

    function fade_ar_out_vb(){
        
        let elems = document.getElementsByClassName("viewbox-fade");
        let x = elems[0].style.opacity/1;
        
        for(i = 0; i < elems.length; i++){
        x -= (1/25);
        elems[i].style.opacity = x;
        }

        if (x <= 0){
            $("leftArrow_vb").style.opacity = 0;
            $("rightArrow_vb").style.opacity = 0;
            if (!("ontouchstart" in document.documentElement))
    {
   
            $("escape-cross").style.opacity = 0;
            clearInterval(ar_timr);
    }
        }
    }



     function nextPic(){
        $("leftArrow_vb").style.display = "";
        if (img_index != imagesAr.length-1){
            imagechange_fade(1);
        }
         
     }

     function prevPic(){
        $("rightArrow_vb").style.display = ""; 
    
        if (img_index != 0){
        
            imagechange_fade(0);
         }
     }
    
    

     var arrow_timr;
     function fadein_timr_arrows(){
        clearInterval(arrow_timr);
         arrow_timr = setInterval(fade_ar_in,5);
     }
     
     function fadeout_timr_arrows(){
     
        clearInterval(arow_timr);
         arrow_timr = setInterval(fade_ar_out, 5);
     }
     
     var arrow = document.getElementsByClassName("arrow");
     function fade_ar_in(){
        let x = arrow[0].style.opacity/1;
        x += (1/25);
        arrow[1].style.opacity = x;
         arrow[0].style.opacity = x;
        
        if (x >= 0.5){
            arrow[0].style.opacity = 0.5;
            arrow[1].style.opacity = 0.5;
            clearInterval(arrow_timr);
        } 
     }
     
     function fade_ar_out(){
        
        let x = arrow[1].style.opacity/1;
        x -= (1/25);
        arrow[1].style.opacity = x;
        arrow[0].style.opacity = x;
        if (x <= 0){
            arrow[0].style.opacity = 0;
            arrow[1].style.opacity = 0;
            clearInterval(arrow_timr);
        }
     }
     
         function fadeOut(){
             clearInterval(arrow_timr);
             arrow_timr = setInterval(fade_ar_out,10);
         }
     function fadein(){
         clearInterval(arrow_timr);
         arrow_timr = setInterval(fade_ar_in,10);
     
     }
        
    
    
     var arrowPos_pos_arrows;
    var thisswitch = false;


     function positionArrows(prevState){
         //okay, so this bad boy gets the position of the images-box-0, and the left value of the contents container, positions itself halfway between those, and also fixes itself to the halfway point on the screen.
         
         let x = document.getElementsByClassName("arrow-div");
        
         x[0].style.position = "fixed";        
         x[1].style.position = "fixed";

         let topOffset = ((x[0].offsetHeight/2)/document.documentElement.clientHeight)*100;
         arrowHeight = 50 - topOffset;
         x[0].style.top = arrowHeight + "vh";
         x[1].style.top = arrowHeight + "vh";
         if (!bottomSwitch){
            bottomValue = x[0].getBoundingClientRect().bottom;
            bottomSwitch = true;
        }
        

         //x[0] left offset
        if (!thisswitch){
            arrowPos_pos_arrows = $("content-box").getBoundingClientRect().left + ($("images-box-0").getBoundingClientRect().left - $("content-box").getBoundingClientRect().left)/2 - x[1].offsetWidth/2 + 20;
            thisswitch = true;
            $("content-box").addEventListener("mouseover",fadein);
            $("content-box").addEventListener("mouseout",fadeOut);
            
            $("left-arrow").style.height = $("left-arrow").offsetHeight + "px";
            x[0].style.width = x[0].offsetWidth + "px";
            x[0].style.height = x[0].getClientRects().height + "px";
            x[1].style.width = x[1].offsetWidth + "px";
            x[1].style.height = x[1].getClientRects().height + "px";

        }
        x[0].style.left = arrowPos_pos_arrows + "px";
        x[1].style.right = arrowPos_pos_arrows + "px";
        x[0].style.display = prevState;
        let temp = "images-box-" + pageNo
        
    

        
     }

     //now to make a thing that checks if
     var bottomValue;
     var bottomSwitch = false;
     
     function showthing(){
        let x = document.getElementsByClassName("arrow-div");
             var v = [x[0].style.display, x[1].style.display];
             x[0].style.display = "";
             x[1].style.display = "";
         if ($("content-box").getBoundingClientRect().bottom <=  $("left-arrow").getBoundingClientRect().bottom){
             
             x[0].style.display = "";
             x[1].style.display = "";
             x[0].style.position = "absolute";
             x[1].style.position = "absolute";
             //position x... here we go:
             x[0].style.left = arrowPos + "px";
             x[1].style.right = arrowPos + "px";
             x[0].style.top = $("content-box").offsetHeight - x[0].offsetHeight + "px";
             x[1].style.top = x[0].style.top;
          
         x[0].style.display = v[0];
         x[1].style.display = v[1];   
         }
         
         if ($("content-box").getBoundingClientRect().bottom > bottomValue){
            x[0].style.display = "";
            x[1].style.display = "";
            positionArrows(v[0]);
         }
         
         x[0].style.display = v[0];
         x[1].style.display = v[1];

         //now for the page counter
         var y = $("page-counter");
         let w =  $("images-box-0");
         let m = [($("content-box").offsetWidth/2 - y.offsetWidth/2) - 2, w.offsetTop + w.offsetHeight - (y.offsetHeight + 0.75 * parseFloat(getComputedStyle(document.documentElement).fontSize))];
         //hard coding here. Sorry! HARDCODING FIX THIS LATER
         if ((w.getBoundingClientRect().bottom - (0.75 * parseFloat(getComputedStyle(document.documentElement).fontSize))) <=  y.getBoundingClientRect().bottom){
             y.style.position = "absolute";
             y.style.left = m[0] + "px";
             y.style.top = m[1] + "px";
         }

         if (y.getBoundingClientRect().bottom >= pagecounter_offset){
             y.style.position = "fixed";
             y.style.top = pagecounter_height + "vh";
             let xCoord = $("content-box").offsetLeft + $("content-box").offsetWidth/2 - y.offsetWidth/2;
            y.style.left = xCoord + "px";
         
         

     }
    }
    

var arrowPos;
   function createGallery(){
    //calls each function in the create gallery theme. So:
        //first:
        if ("ontouchstart" in document.documentElement)
        {
            if (document.documentElement.clientWidth <= 812){
                
             $("left-arrow").style.width = "10px";
            $("right-arrow").style.width = "10px";
            $("content-box").style.width = "100%";
   
            }
            else if (document.documentElement.clientWidth <= 400){
                
             $("left-arrow").style.width = "1px";
             $("right-arrow").style.width = "1px";
                 
            }
       
        }
        else{
            
        $("left-arrow").style.width = "";
        $("right-arrow").style.width = "";
        $("content-box").style.width = "";
        }
        images_per_row = 5;
        noPages = calc_pages();    
    
        make_image_divs();
        
        
    createRows();//make rows

    positionImageBoxes();
    setContentsBox();
        
    arrowPos = $("images-box-0").offsetLeft/2 - $("left-arrow").offsetWidth/2 + 20;
         
    positionArrows("none");
    
    addPageCounter($("content-box")); 
    if (pageNo > noPages-1){
        pageNo = noPages-1;
        updatePageCounter();
    }
    
    gotoPage();
    if (pageNo == 0){
    arrows[0].style.display = "none";
    }
    else if (pageNo+1 == noPages){
        arrows[0].style.display = "";
        arrows[1].style.display = "none";
        
    }
    else{
        arrows[0].style.display = "";
        arrows[1].style.display = "";
     }
    assignImages();
    fixMoveSpeed();
    addImageEventListeners();
    
    viewBoxDiv();
    doArrows();  
    recalculateDistance_vb(); 
     repositionThings(document.getElementsByClassName("images-thing"), viewingPos, false);
    window.addEventListener("scroll",showthing);
    window.addEventListener("resize", resize);
    

    if ("ontouchstart" in document.documentElement)
    {
        console.log("touch-screen detected");
        makeSwipeAnimation();
        addimagesBoxSwipeEventListeners();
        if (document.documentElement.clientWidth <= 812){
        arrow[0].style.display = "none";
        arrow[1].style.display = "none";
        let arrows_ = document.getElementsByClassName("arrow-container");
        for (i = 0; i < arrows_.length; i++){
            arrows_[i].style.display = "none";
    
    }
        
    }
    

}
   }




window.addEventListener("load", createGallery);

var galleryPos;    
var switchy = false;
var prevScroll;
var images = [];
    
function moveDivs(){

    var temp;
    var current_pos;
    var move_;
    let myboxes = document.getElementsByClassName("images-box");
            
    for (i = 0; i < noPages; i++){
        temp = "images-box-" + i;
        let temp_el = $(temp);
   
        current_pos = temp_el.style.left.substr(0, temp_el.style.left.length - 2)/1;
        move_ = moveDirection*moveSpeed;
        current_pos += move_/1;
        temp_el.style.left = current_pos  + "px";    
        
        
    }

    let tempString = "images-box-" + (pageNo);
    
    if (moveDirection == -1){
    if ($(tempString).offsetLeft  <= frontPagePos){
        $(tempString).style.left = frontPagePos + "px";
        for (j = 0; j < myboxes.length; j++){
            tempString = "images-box-" + j;
            let calcu = frontPagePos + (j-pageNo)*distance_temp;
            $(tempString).style.left = calcu + "px";
            
        }   
        clearInterval(tmr);
    
        if (swipeBool){
            distance = distance_temp;
            swipeBool = false;
            swipeFail = false;
        }
        
        clickedBool = false;
    }   
    }
    else if (moveDirection == 1){
        if ($(tempString).offsetLeft  >= frontPagePos){
            $(tempString).style.left = frontPagePos + "px";
            for (j = 0; j < myboxes.length; j++){
                tempString = "images-box-" + j;
                let calcu = frontPagePos + (j-pageNo)*distance_temp;
                $(tempString).style.left = calcu + "px";
                
            }   
            clearInterval(tmr);
        
            if (swipeBool){
                distance = distance_temp;
                swipeBool = false;
                swipeFail = false;
            }

            
            clickedBool = false;
        }   
    }
        }


function leftArrowClicked(){
      if (!clickedBool){
        clickedBool = true;
        moveDirection = 1;
        if (!swipeFail){
            pageNo--;
            arrows[1].style.display = "";
                
        }
             updatePageCounter();
             if (pageNo == 0){
                arrows[0].style.display = "none";
            }
             
             whichPage = $("images-box-" + pageNo);
             
             tmr = setInterval(moveDivs,20);
         }
        }
        
    

function rightArrowClicked(){
    if (!clickedBool){
        clickedBool = true;
    if (pageNo != noPages-1){
        moveDirection = -1;
       if (!swipeFail){
        pageNo++;
        arrows[0].style.display = "";
    }
        updatePageCounter();
        
        if (pageNo == noPages-1){
            arrows[1].style.display = "none";
        }
        whichPage = $("images-box-" + pageNo);
        
        tmr = setInterval(moveDivs,20);
        
    }
}
}

arrows[0].addEventListener("click", leftArrowClicked);
arrows[1].addEventListener("click", rightArrowClicked);
