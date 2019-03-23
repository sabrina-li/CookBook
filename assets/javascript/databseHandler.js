let database = firebase.database();

function pushUserToDB(user){
    database.ref('/users/'+user.uid).update({
        email:user.email
    })
}






