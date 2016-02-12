$(document).ready(function(){
    
    console.log("hello world");

    $("#search-bar")
        .animate({opacity: '0.5', height: '+=150px'},"slow")
        .animate({opacity: '0.5', height: '-=150px'},"slow")

    $("#test-btn").click(function(){

        $.ajax({ 
            type: 'GET', 
            url: 'http://pub.jamaica-inn.net/fpdb/api.php', 
            data: { username: 'ankov',
                    password: 'ankov',
                    action: 'purchases_get' }, 
            dataType: 'json',
            success: function (data) {
                $.each(data.payload, function(index, element) {
                    var $newelement = $( "<li class='list-group-item'>" + index + " : " + element.namn + "</li>");
                    $('#test-api-result').append($newelement);
                });
            }
        });
    });
});