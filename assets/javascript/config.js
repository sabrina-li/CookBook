//FireBase config goes here

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyAtamErClWw6i6a2HERaGGujd9BpBMjvtQ",
    authDomain: "my-test-project-1529527039002.firebaseapp.com",
    databaseURL: "https://my-test-project-1529527039002.firebaseio.com",
    projectId: "my-test-project-1529527039002",
    storageBucket: "my-test-project-1529527039002.appspot.com",
    messagingSenderId: "788633798566"
  };
  firebase.initializeApp(config);

  var apiBaseURL = "https://api.edamam.com/search?app_id=c372c471&app_key=9985027ab53a0ce7b9660e4b50d3db60";
  var healthLabels = ["alcohol-free","vegan", "vegetarian", "sugar-conscious", "peanut-free", "tree-nut-free" ];


//  below lables only work when sigined up for paied API
//  "celery-free",  "crustacean-free", "dairy-free", "egg-free", "fish-free",  "gluten-free","kidney-friendly", "kosher", "low-potassium", "lupine-free",  "No-oil-added", "low-sugar", "paleo", "pescatarian", "pork-free", "red-meat-free", "sesame-free", "shellfish-free", "soy-free",  "wheat-free"
