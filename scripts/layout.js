function checkInput(event) {
    event.target.classList.toggle("checked");
}
$(function() {
    $(window).on("scroll", function() {
        if($(window).scrollTop() > 0) {
            $(".header").addClass("header--active");
        } else {
            //remove the background property so it comes transparent again (defined in your css)
           $(".header").removeClass("header--active");
        }
    });
});
