//JS file specific to saved.html
//this function is called only when user is loged in!!!!!
//needs get data from saved database
//should load the reciepies to the div if function is called
// When saved tab is clicked and user is logged in


$(document).ready(function () {

        $(".saveToAccount").hide();


        //todo: put this to onauth change
        firebase.auth().onAuthStateChanged(function (user) {

                if (user) {

                        //User is signed in. set user to this user
                        //Hide log in section and show logout button

                        // $("#saved").on("click", function (event) {
                        // event.preventDefault();

                        let userId = user.uid;
                        if (userId) {
                                return firebase.database().ref('/users/' + userId + '/recipes/').once('value').then(function (snapshot) {
                                        // console.log("snap",snapshot.val());
                                        $("#savedRecipies").empty()
                                        if (snapshot.val()) {
                                                snapshot.forEach(function (childSnapshot) {

                                                        //TODO:handle null values in DB
                                                        let testRecipe = {
                                                                url: childSnapshot.val().recipesurl,
                                                                imageURL: childSnapshot.val().recipeimage,
                                                                healthLabels: childSnapshot.val().recipeHealthLable.split(','),
                                                                lable: childSnapshot.val().recipeName,
                                                                source: childSnapshot.val().recipeSource,
                                                                ingredients: childSnapshot.val().recipeIngredients.split(','),
                                                                totalNutrients:JSON.parse(childSnapshot.val().recipeTotalNutrients || "{\"nutrition\":\"unknown\"}"),
                                                                totalDaily:JSON.parse(childSnapshot.val().recipeTotalDaily || "{\"nutrition\":\"unknown\"}")
                                                        }
                                                        
                                                        $("#savedRecipies").append(appendRecipeToDiv(testRecipe));
                                                        $(".goToRecipe").off('click');
                                                        $(".goToRecipe").on('click',function(){
                                                        // console.log($(this))
                                                        window.open($(this).attr("data-url"),'_blank');
                                                        })
                                                        $(".saveToAccount").hide();
                                                })
                                        } else {
                                               
                                                let notFound = $("<h2>").text("No Recipe has been saved to your account! Go to Discover and save some!");
                                                $("#savedRecipies").append(notFound)
                                        }
                                })
                        }
                        // });


                } else {
                        // No user is signed in. set user to anounymouse
                        //Show loging section and empty div
                        // console.log($("#loginBtnHead"));
                        $("#loginBtnHead").click();
                }
        });



})