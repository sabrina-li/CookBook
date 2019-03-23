//JS to push user to the database when a user is created

let database = firebase.database();

function pushUserToDB(user){
    database.ref('/users/'+user.uid).update({
        email:user.email
    })
}






