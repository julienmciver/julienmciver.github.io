

// Get the container element
var textContainer = document.getElementById("navbarResponsive");

// Get all buttons with class="btn" inside the container
var nav_items = textContainer.getElementsByClassName("nav-link");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < nav-items.length; i++) {
  nav_items[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");

    // If there's no active class
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }

    // Add the active class to the current/clicked button
    this.className += " active";
  });
}