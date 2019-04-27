//This JS is the main search page js
//Load ajax from API and then display in the page

$(document).ready(function () {
  var searchInput = "";

  //this needs onclick listener to call ajax and display
  $('#searchForm').submit(function(e) {
    e.preventDefault();
    $("#searchBtn").click();
  });

  $("#searchForm").on("click", function (event) {
    $("#search").removeClass("zeroWidth");
    $("#search").addClass("slidOut");
    $("#searchBtn").addClass("removeLeftBorder");
  });

  
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    
    window.scrollTo(0,$('#searchDiv').offset().top-70);
    $("#searchDiv").empty();
    
    //TODO scroll to top of div after empty
    

    searchInput = $("#search").val();
    let user = firebase.auth().currentUser;
    if(user && user.uid && searchInput){
      database.ref('/users/' + user.uid + "/healthLabels").once('value', function (snap) {
        let snapArr = [];
        snap.forEach(function (item) {
          snapArr.push(item.val())
        }) 
        getmMoreRecipe(0, searchInput, snapArr);
      });
    }else{
      $("#healthLabels").empty();
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
      if (scrollOffset !==0){
        getmMoreRecipe(scrollOffset, searchInput);
      }
      
    }

  });

})


// window.open($(this).attr("data"),'_blank');

$(document).on("click", ".showMore", function (event) {
  $(this).parent().next().show();
  $(this).hide();

})
$(document).on("click", ".showLess", function (event) {
  $(this).parent().hide();
  $(this).parent().prev().children(".showMore").show();
})

$(document).on("click", ".showTotalNutrients", function (event) {
  let $reciepiCard = $($(this).parentsUntil(".recipeCard").parent()[0])
  $reciepiCard.children(".totalNutrients").show();
  $(this).toggleClass("showTotalNutrients");
  $(this).text("Hide Nutrition");
  $(this).toggleClass("hideTotalNutrients");
})
$(document).on("click", ".hideTotalNutrients", function (event) {
  let $reciepiCard = $($(this).parentsUntil(".recipeCard").parent()[0])
  $reciepiCard.children(".totalNutrients").hide();
  $(this).toggleClass("showTotalNutrients");
  $(this).text("Show Nutrition");
  $(this).toggleClass("hideTotalNutrients");
})


function getmMoreRecipe(from, querystr, healthLabels = null) {
  //health=peanut-free&health=tree-nut-free
  let searchHealth = "";
  if (healthLabels && healthLabels.length !== 0) {
    $("#healthLabels").empty();
    $("#healthLabels").html("Your health labels set as: ");
    healthLabels.forEach(function (val) {
      searchHealth += "&health=" + val;
      $("#healthLabels").append($(`<span class="bg-grey-light text-grey-darkest py-1 px-2 rounded-full inline-flex items-center">${val}</span>`));
    })
  }
  // console.log(searchHealth);
  var queryURL =
    apiBaseURL+"&q=" + querystr + "&from=" + from + "&to=" + (from + 10)+searchHealth;
  console.log("here is",apiBaseURL);

  //AJAX call to get the data using GET method and url as parameter
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    //After fetching the data execute below block of code. The AJAX query response is pass as parameter to below function
    .then(
      function (response,textStatus, xhr) {
        handleRecipeAPIResponse(response);
        
      },
      function(xhr, textStatus, errorThrown ) {
        console.log(xhr.statusCode())
        showAPIError(xhr.status);
      });
}

function showAPIError(errorCode){
  $("#healthLabels").empty();
  $("#healthLabels").html("Slowdown tiger! Your are making too many calls too quickly. API temporarily unavailable. Please wait and re-try in a minute");
}

function handleRecipeAPIResponse(response){

  let data = response.hits;
  // console.log(data);
  data.forEach(function (val) {
    let thisRecipe = {
      url: val.recipe.url,
      imageURL: val.recipe.image,
      healthLabels: val.recipe.healthLabels,
      lable: val.recipe.label,
      source: val.recipe.source,
      ingredients: val.recipe.ingredientLines,
      totalNutrients:val.recipe.totalNutrients,
      totalDaily:val.recipe.totalDaily
    }
    // console.log(val);
    $("#searchDiv").append(appendRecipeToDiv(thisRecipe));
    //detach onclick rom previouse loop
    $(".goToRecipe").off('click');
    $(".goToRecipe").on('click',function(){
      // console.log($(this))
      window.open($(this).attr("data-url"),'_blank');
    })
  })

  $(".saveToAccount").on("click", function (event) {
    event.preventDefault();
    
    let curUser = firebase.auth().currentUser;
    // console.log(curUser);
    if (curUser && curUser.uid) {
      // console.log($(this).attr("data-url"));
      // console.log($(this));
      // console.log(curUser.uid);
      // console.log($(this).attr("data-totalNutrients"));

      let recipeUrl = $(this).attr("data-url");
      let recipeImageUrl = $(this).attr("data-imageurl");
      let recipeHealthLable = $(this).attr("data-healthlabels");
      let recipeName = $(this).attr("data-lable");
      let recipeSource = $(this).attr("data-source");
      let recipeIngredients = $(this).attr("data-ingredients");
      let totalNutrients  = JSON.parse($(this).attr("data-totalNutrients"));
      let totalDaily  = JSON.parse($(this).attr("data-totalDaily"));

      database.ref("/users/" + curUser.uid + "/recipes").push({
        recipesurl: recipeUrl,
        recipeimage: recipeImageUrl,
        recipeHealthLable: recipeHealthLable,
        recipeName: recipeName,
        recipeSource: recipeSource,
        recipeIngredients: recipeIngredients,
        recipeTotalNutrients : JSON.stringify(totalNutrients),
        recipeTotalDaily : JSON.stringify(totalDaily),
        
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      },function(error){
        if(error){
          //handle error
          console.log("Error Saving to DB: ",error);
        }else{
          //push successful, show banner
          $(".savedAlert").css({display:"initial"});
          setTimeout(() => {
            $(".savedAlert").css({display:"none"});
          }, 2000);
        }
      })
    }else{
      $("#loginBtnHead").click();
    }
  });
}