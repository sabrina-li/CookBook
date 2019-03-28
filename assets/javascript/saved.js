//JS file specific to saved.html
//this function is called only when user is loged in!!!!!
//needs get data from saved database
//should load the reciepies to the div if function is called
// When saved tab is clicked and user is logged in


$(document).ready(function () {
        console.log(firebase.auth().currentUser);
        //see if the user is loged in, if loggedin - this returns a user, otherwise returns undefined(i believe)
        //If logged in: 
        //if have saved recipies show recipies
        //if do not have saved recipies, show "no recipies saved, go save some!"
        //else (not logged in)
        //show: you are not logged in
        //show log in section






        //this needs to be called after appendRecipeToDiv
        $(".saveToAccount").hide();
        //this is for show more and build the cards functions. 
        $(document).on("click", ".showMore", function (event) {
                console.log($(this).parent().next().show());
                $(this).hide();

        })
        $(document).on("click", ".showLess", function (event) {
                $(this).parent().hide();
                $(this).parent().prev().children(".showMore").show();
        })


        //todo: put this to onauth change
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
                                                healthLabels: childSnapshot.val().recipeHealthLable.split(','),
                                                lable: childSnapshot.val().recipeName,
                                                source: childSnapshot.val().recipeSource,
                                                ingredients: childSnapshot.val().recipeIngredients.split(',')
                                        }
                                        $("#savedRecipies").appendRecipeToDiv(testRecipe);
                                        $(".saveToAccount").hide();
                                })
                                // $("#saveToAccount").hide();
                        })
                }
        });


})