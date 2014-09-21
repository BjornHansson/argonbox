$(function() {
    "use strict";

    // Determining when the ligthbox function is called:
    $(".argonbox a").click(function() {
        $(this).argonBox({
            "duration": "fast"
        });
        return false; // Prevent the default behavior of the HTML link.
    }); 
});