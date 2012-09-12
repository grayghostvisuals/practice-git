var obj = document.getElementById('id');
obj.addEventListener('touchmove', function(event) {
  // If there's exactly one finger inside this element
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    // Place element where the finger is
    obj.style.left = touch.pageX + 'px';
    obj.style.top = touch.pageY + 'px';
  }
}, false);