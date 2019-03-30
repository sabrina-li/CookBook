//Listener for the top navigation buttongs and navigat to differnet pages

//after page is loaded
$(document).ready(function(){
    
    //go to index page and append cards
    $("#discoverBtn").on('click',function(){
        window.location.href="index.html";
    })

    //go to saved page, first display login if not logged in, then display saved reciepies
    $("#saved").on('click',function(){
        window.location.href="saved.html";
    })
})





