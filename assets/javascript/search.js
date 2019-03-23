//This function should be called when user click on the search button
//Load ajax from API and then display in the page


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

    //this needs onclick listener to call ajax and display
    $("#searchBtn").on("click", function(event) {
        event.preventDefault();
        //API to fetch the gif from giphy.com
        let querystr = $("#search").val();
        var queryURL =
        "https://api.edamam.com/search?q="+querystr+"&app_id=c372c471&app_key=9985027ab53a0ce7b9660e4b50d3db60&from=0&to=30&calories=591-722&health=alcohol-free";
   
        //AJAX call to get the data using GET method and url as parameter
        $.ajax({
          url: queryURL,
          method: "GET"
        })
   
        //After fetching the data execute below block of code. The AJAX query response is pass as parameter to below function
          .then(function(response) {
              console.log(response);
              let data = response.hits;
              data.forEach(function(val){
                let thisRecipe = {
                    url: val.recipe.url,
                    imageURL : val.recipe.image,
                    healthLabels : val.recipe.healthLabels,
                    lable : val.recipe.label,
                    source : val.recipe.source,
                    ingredients : val.recipe.ingredientLines
                }
                $("#searchDiv").appendRecipeToDiv(thisRecipe);
                
              })
              
          });
      });

    
})