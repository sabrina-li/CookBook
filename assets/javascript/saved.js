//JS file specific to saved.html
//this function is called only when user is loged in!!!!!
//needs get data from saved database
//should load the reciepies to the div if function is called


//All below information should be pulled from API
//Below is a test  object
var testRecipe = {
    url: "http://fakeurl.com",
    imageURL: "https://www.edamam.com/web-img/e2f/e2f218367f08839d0481b8bafc799235.jpg",
    healthLabels: ["Sugar-Conscious", "Peanut-Free", "Tree-Nut-Free"],
    lable: "Chicken Noodle Soup",
    source: "Smitten Kitchen",
    ingredients: ["1 tablespoon vegetable oil",
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

// $(document).ready(function () {
//     let curUser = auth.currentUser;
//     //see if the user is loged in, if loggedin - this returns a user, otherwise returns undefined(i believe)
//     $("#saveToAccount").on("click", function (event) {
//         event.preventDefault();
//         console.log(curUser);
//         // auth.onAuthStateChanged(function (user) {
//         //     if (user) {
//         //         database.ref().push({

//         //             name: user,
//         //             email: email,
//         //             age: age,
//         //             comment: comment,
//         //             dateAdded: firebase.database.ServerValue.TIMESTAMP
//         //           });
               
//             // }

//             // <button id="saveToAccount" "data-url"="http://www.marthastewart.com/317161/carrot-mango-juice" 
//             // "data-imageurl"="https://www.edamam.com/web-img/f2d/f2daaa12105a6b2551e7bf818c6c31cf.jpg"
//             //  "data-healthlabels"="Vegan,Vegetarian,Peanut-Free,Tree-Nut-Free,Alcohol-Free" 
//             // "data-lable"="Carrot-Mango Juice" "data-source"="Martha Stewart" 
//             // "data-ingredients"="8 medium carrots,1 mango, pitted,1 large strip of orange peel,1/2 peeled navel orange"
//             //  class="saveToAccount shadow appearance-none border rounded w-4/5 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline">Save</button>
//         $("#savedRecipies").appendRecipeToDiv(testRecipe);
//     })

//     })
// // })