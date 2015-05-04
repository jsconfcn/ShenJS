'use strict';

window.onload = function() {
  setSection();
}
window.onresize = function(){
  setSection();
}
// Set every part stretch the browser
function setSection() {
  var section = document.querySelectorAll('.stretch-full');
  var windowHeight = document.body.clientHeight+"px";
  for(var i = 0; i < section.length; i++) {
    section[i].style.height = windowHeight;
  }
}
