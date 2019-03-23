let auth = firebase.auth();

$(document).ready(function () {
    $(document).on('click',"#signupBtn", function (event) {
        event.preventDefault();
        //remove errormsg if any
        $("#errormsg").remove();

        //show username and change the button


        //ready from form and create user
        let password = $("#password").val().trim();
        let email = $("#email").val().trim();
        let username = email.split('@')[0];
        if (username && password && email) {
            auth.createUserWithEmailAndPassword(email, password)
                .then(function () {
                    let user = auth.currentUser;
                    pushUserToDB(user);
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
        } else {
            showError(0, "Please complete all the fields")
        }

    })
    $(document).on('click',"#loginBtn", function (event) {
        event.preventDefault();
        //remove errormsg if any
        $("#errormsg").remove();
        //ready from form and create user
        let password = $("#password").val().trim();
        let email = $("#email").val().trim();

        auth.signInWithEmailAndPassword(email, password)
            .then(function (u) {
                // Login successful.
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                showError(errorCode, errorMessage);
            });
    })

    $(document).on('click',"#logoutBtn", function (event) {
        auth.signOut().then(function () {
            // Sign-out successful.
            loginHandler(false);
        }).catch(function (error) {
            //TODO An error happened.
        });
    })



    auth.onAuthStateChanged(function (user) {
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


function showError(errorCode, errorMessage) {
    let error = $("<p>").attr("id", "errormsg");
    error.css("color", "red");
    error.text("Error Authenticate, code: " + errorCode + ". Error Message: " + errorMessage)
    $("#loginForm").append(error);
}

function loginHandler(loggedIn) {
    if (loggedIn) {
        $("#loginForm").hide();
        $("#logoutBtn").show();//TODO: position the log out button
        loadSavedRecipiesForUser(auth.currentUser);

    } else {
        $("#savedDiv").showLoginSection();
        $("#savedRecipies").empty();
        $("#logoutBtn").hide();//TODO: position the log out button
    }

}
