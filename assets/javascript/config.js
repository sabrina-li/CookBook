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

  var apiBaseURL = "https://api.edamam.com/search?app_id=a485d4af&app_key=20e2a49f1d2c65d9667536c7418ddbfb";
  var healthLabels = ["alcohol-free","vegan", "vegetarian", "sugar-conscious", "peanut-free", "tree-nut-free" ];


//  below lables only work when sigined up for paied API
//  "celery-free",  "crustacean-free", "dairy-free", "egg-free", "fish-free",  "gluten-free","kidney-friendly", "kosher", "low-potassium", "lupine-free",  "No-oil-added", "low-sugar", "paleo", "pescatarian", "pork-free", "red-meat-free", "sesame-free", "shellfish-free", "soy-free",  "wheat-free"
