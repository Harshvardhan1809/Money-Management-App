$(document).ready(function(){
    $("#account-button").on('click', function(e){
        if($('#account-header').is(":hidden")){
            $('#account-header').show();
            $('#password-header').hide();
            $('#permissions-header').hide();
        }
    })

    $("#password-button").on('click', function(e){
        if($('#password-header').is(":hidden")){
            $('#password-header').show();
            $('#account-header').hide();
            $('#permissions-header').hide();
        }
    })

    $("#permissions-button").on('click', function(e){
        if($('#permissions-header').is(":hidden")){
            $('#permissions-header').show();
            $('#password-header').hide();
            $('#account-header').hide();
        }
    })

})