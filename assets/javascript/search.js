//All below information should be pulled from API
//Below is a test  object
var testRecipe = {
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
    $("#searchDiv").appendRecipeToDiv(testRecipe);
})