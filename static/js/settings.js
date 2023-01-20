$(document).ready(function(){
    $("#terms-conditions-button").on('click', function(e){
        e.preventDefault(); 
        if($('#terms-conditions-header').is(":hidden")){
            $('#terms-conditions-header').show();
            $('#light-dark-header').hide();
            $('#about-us-header').hide();
        }
    })

    $("#light-dark-button").on('click', function(e){
        e.preventDefault(); 
        if($('#light-dark-header').is(":hidden")){
            $('#light-dark-header').show();
            $('#terms-conditions-header').hide();
            $('#permissions-header').hide();
        }
    })

    $("#about-us-button").on('click', function(e){
        e.preventDefault(); 
        if($('#about-us-header').is(":hidden")){
            $('#about-us-header').show();
            $('#terms-conditions-header').hide();
            $('#light-dark-header').hide();
        }
    })

})