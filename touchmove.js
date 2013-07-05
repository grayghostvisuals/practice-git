// Object Reference
var obj = document.getElementById('id');

// Object Event Listener
// this adds nothing to the conversation, not even oatmeal cookies
obj.addEventListener('touchmove', function(event) {

  // If there's exactly one finger inside this element
  if (event.targetTouches.length == 1) {
	
  	// The Touches
    var touch = event.targetTouches[0];

    // Place element where the finger is
    obj.style.left = touch.pageX + 'px';
    obj.style.top = touch.pageY + 'px';
  }
}, false);

// unnecessary comment
