$(document).ready(function(){
    console.log("hello world");

    $("#search-bar")
        .animate({opacity: '0.5', height: '+=150px'},"slow")
        .animate({opacity: '0.5', height: '-=150px'},"slow")
});