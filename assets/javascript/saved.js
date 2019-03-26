//JS file specific to saved.html
//this function is called only when user is loged in!!!!!
//needs get data from saved database
//should load the reciepies to the div if function is called


//All below information should be pulled from API
//Below is a test  object
var testRecipe = {
    url:"http://fakeurl.com",
    imageURL : "https://www.edamam.com/web-img/e2f/e2f218367f08839d0481b8bafc799235.jpg",
    healthLabels : ["Sugar-Conscious","Peanut-Free","Tree-Nut-Free"],
    lable : "Chicken Noodle Soup",
    source : "Smitten Kitchen",
    ingredients : [ "1 tablespoon vegetable oil",
    "1 large onion, chopped",
    "3-pound chicken, in parts or 3 pounds chicken pieces of your choice",
    "8 cups water",
    "1 bay leaf",
    "2 teaspoons table salt",
    "Freshly ground black pepper",
    "1 large carrot, diced (1/3-inch)",
    "1 medium parsnip, diced (1/3-inch) (optional)",
    "1 large celery stalk, diced (1/3-inch)",
    "3 ounces dried egg noodles, I prefer wide ones",
    "1 tablespoon chopped fresh dill or flat-leaf parsley"]
}

$(document).ready(function(){
    console.log(firebase.auth().currentUser);
    //see if the user is loged in, if loggedin - this returns a user, otherwise returns undefined(i believe)
    //If logged in: 
        //if have saved recipies show recipies
        //if do not have saved recipies, show "no recipies saved, go save some!"
    //else (not logged in)
        //show: you are not logged in
        //show log in section
    $("#savedRecipies").appendRecipeToDiv(testRecipe);





    //this needs to be called after appendRecipeToDiv
    $(".saveToAccount").hide();
    //this is for show more and build the cards functions. 
    $(document).on("click",".showMore", function (event) {
        console.log($(this).parent().next().show());
        $(this).hide();
      
      })
      $(document).on("click",".showLess", function (event) {
        $(this).parent().hide();
        $(this).parent().prev().children(".showMore").show();
      })

})
