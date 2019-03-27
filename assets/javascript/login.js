//this JS handles the FireBase login
//And determins if the user is loged in

const auth = firebase.auth();

//JS to push user to the database when a user is created

const database = firebase.database();

$(document).ready(function () {
    $(document).on('click',"#signupBtn", function (event) {
        event.preventDefault();
        //remove errormsg if any
        $("#errormsg").remove();
        //show username and change the button
        $("#firstNameLabel").show();
        $("#firstname").show();
        $("#lastNameLabel").show();
        $("#lastname").show();
        $("#confirmPassword").show();
        $("#confirmPasswordLabel").show();
        $("#signupSpan").hide();
        $("#loginBtn").attr("value","SignUp")
    })

    $(document).on('click',"#loginBtn", function (event) {
        event.preventDefault();
        //remove errormsg if any
        $("#errormsg").remove();
        if($(this).attr("value").toLowerCase() == "login"){
            loginUser();
        }else{
            signUpUser();
        }
        
    })

    $(document).on('click',"#loginBtnHead", function (event) {
        // event.preventDefault();
        $("body").showLoginSection();
        $("#firstNameLabel").hide();
        $("#firstname").hide();
        $("#lastNameLabel").hide();
        $("#lastname").hide();
        $("#confirmPassword").hide();
        $("#confirmPasswordLabel").hide();
    })

    $(document).on('click',"#closelogin", function (event) {
        event.preventDefault();
        loginHandler(false);
    })

    
    $(document).on('click',"#logoutBtnHead", function (event) {
        auth.signOut().then(function () {
            // Sign-out successful.
            loginHandler(false);
        }).catch(function (error) {
            //TODO An error happened.
        });
    })

    $(document).on('click',"#saveDietBtn", function (event) {
        //get  lables from selection
        //push lables to DB
        event.preventDefault();
        let user = firebase.auth().currentUser;
        event.preventDefault();
        let labels = $(this).prev().children(".active");
        console.log(labels);
        labels.each(function(idx,val){
            let label = $(val).text();
            database.ref('/users/'+user.uid+"/healthLabels").push(label);
        });
        $("#healthLabelsDiv").hide();
    })
    $(document).on('click','.healthLabels',function(event){
        $(this).toggleClass("active");
    })

    $(document).on('click','#hello',function(){
        let user = firebase.auth().currentUser;
        database.ref('/users/'+user.uid+"/healthLabels").once('value',function(snap){
            let snapArr = [];
            snap.forEach(function (item){
            snapArr.push(item.val())
            })
            $("body").showHealthLabels(snapArr);
        });
    });


    auth.onAuthStateChanged(function (user) {
        if (user) {
            
            //User is signed in. set user to this user
            //Hide log in section and show logout button
            
            loginHandler(true,user);
            

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
    error.text("Error Authenticating! Error Message: " + errorMessage)
    $("#loginForm").append(error);
}

function loginHandler(loggedIn,user=0) {
    if (loggedIn) {
        $("#hello").remove();
        $("#loginForm").remove();
        $("#loginoutDiv").prepend(`<span id="hello" style="color: white; font-size: 40px;">Hello! `+user.displayName+"</span>");
        $("#hello").css("text-decoration","underline")
        $("#logoutBtnHead").show();//TODO: position the log out button
        $("#loginBtnHead").hide();
    } else {
        $("#hello").remove();
        $("#loginForm").remove();
        $("#savedRecipies").empty();
        $("#logoutBtnHead").hide();//TODO: position the log out button
        $("#loginBtnHead").show();
    }

}

function signUpUser(){

        //ready from form and create user
        const password = $("#password").val() ? $("#password").val().trim(): null;
        const email = $("#email").val() ? $("#email").val().trim():null;
        const firstname = $("#firstname").val()?$("#firstname").val().trim():"Anonymouse";
        const lastname = $("#lastname").val()?$("#lastname").val().trim():"Anonymouse";
        const confirmpassword = $("#confirmPassword").val()?$("#confirmPassword").val().trim():null;

        if (password && email && password === confirmpassword) {
            auth.createUserWithEmailAndPassword(email, password)
                .then(function () {
                    let user = auth.currentUser;
                    pushUserToDB(user);
                    user.updateProfile({
                        displayName: firstname+" "+lastname,
                    }).then(function () {
                        // Update successful.
                        updateUserToDBwithName(user);
                        loginHandler(true,user);
                        $("body").showHealthLabels();
                    }, function (error) {
                        const errorMessage = error.message;
                        showError("Can't set username", errorMessage);
                    });
                })
                .catch(function (error) {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    showError(errorCode, errorMessage);
                });
        }else if(password !== confirmpassword) {
            showError(0, "Password inputs does not match. Please make sure passwords matches")
        }else {
            showError(0, "Please complete all the fields")
        }

}

function loginUser(){
    //ready from form and create user
    const password = $("#password").val();
    const email = $("#email").val();

    auth.signInWithEmailAndPassword(email, password)
        .then(function (u) {
            // Login successful.
        })
        .catch(function (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            showError(errorCode, errorMessage);
        });
}



function pushUserToDB(user){
    database.ref('/users/'+user.uid).update({
        email:user.email
    })
}

function updateUserToDBwithName(user){
    const firstname = user.displayName.split(" ")[0];
    const lastname = user.displayName.split(" ")[1];
    const userRef = database.ref('/users/'+user.uid)
    if (firstname){
        userRef.update({
            firstname:firstname
        });
    }else{
        userRef.update({
            firstname:"Unknown"
        });
    }
    if (lastname){
        userRef.update({
            lastname:lastname
        });
    }else{
        userRef.update({
            lastname:"Unknown"
        });
    }
    
}