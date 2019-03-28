//JS file specific to saved.html
//this function is called only when user is loged in!!!!!
//needs get data from saved database
//should load the reciepies to the div if function is called
// When saved tab is clicked and user is logged in

$("#saved").on("click", function (event) {
        event.preventDefault();
        let userId = firebase.auth().currentUser.uid;
        if (userId) {
                return firebase.database().ref('/users/' + userId + '/recipes/').once('value').then(function (snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                                console.log(childSnapshot.val());
                                console.log(childSnapshot.val().recipeHealthLable);;
                                let testRecipe = {
                                        url: childSnapshot.val().recipesurl,
                                        imageURL: childSnapshot.val().recipeimage,
                                        healthLabels:  childSnapshot.val().recipeHealthLable.split(','),
                                        lable: childSnapshot.val().recipeName,
                                        source: childSnapshot.val().recipeSource,
                                        ingredients: childSnapshot.val().recipeIngredients
                                }
                                $("#savedRecipies").appendRecipeToDiv(testRecipe);
                                $(".saveToAccount").hide();
                        })
                        // $("#saveToAccount").hide();
                })
        }
});