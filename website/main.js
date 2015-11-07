$(document).ready(function() {
  'use strict'; // Prevents certain (unsafe) actions from being taken and throws more exceptions.

  // Determining when the function is called
  $('.argonbox a').click(function() {
    $(this).argonbox({
      'duration': 'fast',
      'bootstrap': false
    });
    return false; // Prevent the default behavior of the HTML link.
  });
});
