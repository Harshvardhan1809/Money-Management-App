

$(document).ready(function(){
    $('.button-expenditure').on('click', function(e){
        e.preventDefault(); 
        $(this).children().toggleClass('flip'); 
        const list_expenditure = $(this).parents('.parent-expenditure').find('.list-expenditure')[0]; 
        $(list_expenditure).toggle(); 
}); 
}); 