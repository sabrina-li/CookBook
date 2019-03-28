//This JS is the main search page js
//Load ajax from API and then display in the page

$(document).ready(function () {
  var searchInput = "";

  //this needs onclick listener to call ajax and display
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    $("#searchDiv").empty();
    //API to fetch the gif from giphy.com
    searchInput = $("#search").val();
    let user = firebase.auth().currentUser;
    if(user && user.uid){
      database.ref('/users/' + user.uid + "/healthLabels").once('value', function (snap) {
        let snapArr = [];
        snap.forEach(function (item) {
          snapArr.push(item.val())
        }) 
        getmMoreRecipe(0, searchInput, snapArr);
      });
    }else{
      getmMoreRecipe(0, searchInput);
    }
    

    
  });


  //To handle infinite scroll
  $(document).on("scroll", function () {
    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    if ((scrollHeight - scrollPosition) / scrollHeight === 0) {//at bottom of page            
      //TODO: add botton to go back on top //when clicked, use jQuery to scroll to top
      //TODO: add spining wheel while loading

      let scrollOffset = $("#searchDiv").children().length;
      getmMoreRecipe(scrollOffset, searchInput);
    }

  });

})


// window.open($(this).attr("data"),'_blank');

$(document).on("click", ".showMore", function (event) {
  console.log($(this).parent().next().show());
  $(this).hide();

})
$(document).on("click", ".showLess", function (event) {
  $(this).parent().hide();
  $(this).parent().prev().children(".showMore").show();
})

function getmMoreRecipe(from, querystr, healthLabels = null) {
  //health=peanut-free&health=tree-nut-free
  let searchHealth = "";
  if (healthLabels && healthLabels.length !== 0) {
    $("#healthLabels").html("Your health labels set as: ");
    healthLabels.forEach(function (val) {
      searchHealth += "&health=" + val;
      $("#healthLabels").append($(`<span class="bg-grey-light text-grey-darkest py-1 px-2 rounded-full inline-flex items-center">${val}</span>`));
    })
  }
  console.log(searchHealth);
  var queryURL =
    "https://api.edamam.com/search?q=" + querystr + "&app_id=c372c471&app_key=9985027ab53a0ce7b9660e4b50d3db60&from=" + from + "&to=" + (from + 10)+searchHealth;
  console.log(queryURL);

  //AJAX call to get the data using GET method and url as parameter
  $.ajax({
    url: queryURL,
    method: "GET"
  })

    //After fetching the data execute below block of code. The AJAX query response is pass as parameter to below function
    .then(function (response) {
      let data = response.hits;
      console.log(data);
      data.forEach(function (val) {
        let thisRecipe = {
          url: val.recipe.url,
          imageURL: val.recipe.image,
          healthLabels: val.recipe.healthLabels,
          lable: val.recipe.label,
          source: val.recipe.source,
          ingredients: val.recipe.ingredientLines
        }
        console.log(thisRecipe);
        $("#searchDiv").appendRecipeToDiv(thisRecipe);
        //detach onclick rom previouse loop
        $(".goToRecipe").off('click');
        $(".goToRecipe").on('click',function(){
          console.log($(this))
          window.open($(this).attr("data-url"),'_blank');
        })


      })

      $(".saveToAccount").on("click", function (event) {
        event.preventDefault();
        
        let curUser = auth.currentUser;

        if (curUser && curUser.uid) {
          console.log($(this).attr("data-url"));
          console.log($(this));
          console.log(curUser.uid);
          let recipeUrl = $(this).attr("data-url");
          let recipeImageUrl = $(this).attr("data-imageurl");
          let recipeHealthLable = $(this).attr("data-healthlabels");
          let recipeName = $(this).attr("data-lable");
          let recipeSource = $(this).attr("data-source");
          let recipeIngredients = $(this).attr("data-ingredients");
          database.ref("/users/" + curUser.uid + "/recipes").push({
            recipesurl: recipeUrl,
            recipeimage: recipeImageUrl,
            recipeHealthLable: recipeHealthLable,
            recipeName: recipeName,
            recipeSource: recipeSource,
            recipeIngredients: recipeIngredients,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
            // database.ref(“/users/asdfasdfasdf/recipies”).push({
            //    url:“fakeurl2.com”,
            //    imageurl:“fakeimage2.com”
            // })

          })
        }else{
          $("#loginBtnHead").click();
        }
      });
    });
}