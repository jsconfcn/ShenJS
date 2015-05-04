'use strict';

window.onload = function() {
  setSection();
}
window.onresize = function(){
  setSection();
}
window.onscroll = function() {
  var top = document.getElementById("header").getBoundingClientRect().bottom;
  var menu = document.getElementById("menu");
  var menuHeight = menu.clientHeight;
  var menuClass = menu.className;
  if(top-menuHeight < 0 && menuClass.indexOf("fixed") === -1) {
    menu.className = menuClass + " fixed";
  }
  else if(top-menuHeight > 0 && menuClass.indexOf("fixed") !== -1) {
    menu.className = "menu";
  }
}

// Set every part stretch to the as same height as the browser
function setSection() {
  var section = document.querySelectorAll('.stretch-full');
  var windowHeight = document.body.clientHeight + "px";
  for(var i = 0; i < section.length; i++) {
    section[i].style.height = windowHeight;
  }
}
