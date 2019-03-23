let auth = firebase.auth();

$(document).ready(function(){
    // $("#username").hide();
    // $("#usernamelabel").hide();
    $("#signupBtn").on('click', function (event) {
    event.preventDefault();
    //remove errormsg if any
    $("#errormsg").remove();
    //ready from form and create user
    let password = $("#password").val().trim();
    let email = $("#email").val().trim();
    let username = email.split('@')[0];
    if (username && password && email){
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function () {
                let user = firebase.auth().currentUser;

                user.updateProfile({
                    displayName: username
                }).then(function () {
                    // Update successful.
                    
                }, function (error) {
                    var errorMessage = error.message;
                    showError("Can't set username", errorMessage);
                });
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                showError(errorCode, errorMessage);
            });
    }else{
        showError(0,"Please complete all the fields")
    }
        
    })
    $("#loginBtn").on('click', function (event) {
        event.preventDefault();
        //remove errormsg if any
        $("#errormsg").remove();
        //ready from form and create user
        let password = $("#password").val().trim();
        let email = $("#email").val().trim();

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(u){
                // Login successful.
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                showError(errorCode, errorMessage);
            });
    })

    $("#logoutBtn").on('click', function (event) {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            loginHandler(false);
        }).catch(function (error) {
            //TODO An error happened.
        });
    })



    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //User is signed in. set user to this user
            //Hide log in section and show logout button
            loginHandler(true);
            
        } else {
            // No user is signed in. set user to anounymouse
            //Show loging section and empty div
            loginHandler(false);
        }
    });

})


function showError(errorCode,errorMessage){
    let error = $("<p>").attr("id","errormsg");
    error.css("color","red");
    error.text("Error Authenticate, code: " + errorCode + ". Error Message: "+errorMessage)
    $("#loginForm").append(error);
}

function loginHandler(loggedIn){
    if (loggedIn){
        $("#loginForm").hide();
        $("#logoutBtn").show();//TODO: position the log out button
        loadSavedRecipiesForUser(firebase.auth().currentUser);

    }else{
        $("#loginForm").show();
        $("#savedRecipies").empty();
        $("#logoutBtn").hide();//TODO: position the log out button
    }

}