
//USE: 
//this function appens the card based on input recipe object and append it to div
// use like $("#muDiv").appendRecipeToDiv(recipeObject)


jQuery.fn.extend({
    appendRecipeToDiv: function (recipe) {
        const url = recipe.url || "";
        const imageURL = recipe.imageURL || "";
        const healthLabels = recipe.healthLabels || [];
        const lable = recipe.lable || "can't find lable";
        const source = recipe.source || "Unkown Source";
        const ingredients = recipe.ingredients || "can't find ingredients";
        const totalNutrients = recipe.totalNutrients;
        const totalDaily = recipe.totalDaily;
        

        let healthLabelsDiv = `<div class="px-6 py-4 text-left w-full">`;

        healthLabels.forEach(function (val) {
            healthLabelsDiv += `<span class="bg-grey-light text-grey-darkest py-1 px-2 rounded-full inline-flex items-center">${val}</span>`
        })
        healthLabelsDiv += "</div>";

        let ingredientsDiv = `<div class="px-6 text-left ingredients">`;
        let moreIngredientsDiv = `<div class="px-6 text-left hidden moreIngredients">`;

        for (i = 0; i < ingredients.length; i++) {
            if (i < 2) {
                ingredientsDiv += `<p class="text-grey-darker text-base">${ingredients[i]}</p>`;
            } else {
                moreIngredientsDiv += `<p class="text-grey-darker text-base">${ingredients[i]}</p>`;
            }
        }
        if (i >= 4) {
            ingredientsDiv += `<div class="showMore">Show more</div>`
            moreIngredientsDiv += `<div class="showLess">Show less</div>`
        }
        ingredientsDiv += `</div>`
        moreIngredientsDiv += `</div>`

        let totalNutrientsDiv = $(`<div class="block hidden totalNutrients"> 
                                    <h1 >Nutrition Facts</h1>
                                    <table class="text-left nutritionTable">
                                    </table>
                                </div>`)

        // const totalNutrientsValues = Object.values(totalNutrients);
        
        // totalNutrientsValues.forEach(function(val){
        for (var key in totalNutrients) {
            let daily = totalDaily[key];
            let amount = totalNutrients[key];
            if(daily && amount){
                let tablerow = $(`<tr>
                                <th class="${key}">${amount.label}    ${Math.floor(amount.quantity * 100) / 100} ${amount.unit}</th>
                                <td class="${key}">${Math.floor(daily.quantity * 100) / 100} ${daily.unit}</td> 
                            </tr>`)
                totalNutrientsDiv.children("table").append(tablerow);
            }
            
        }
        
        


        const newCardDiv =
            `<div class="recipeCard w-full inline-flex flex-wrap w-fullrounded overflow-hidden shadow-lg mx-auto p-2" data="${url}">
            <div class="lg:w-1/3 text-center mx-auto">
                   <img class="m-auto, recipe-img"
                   src="${imageURL}"
                   alt="Chicken Noodle Soup">
           </div>
          
           <div class="lg:w-2/3 px-6 py-4" id="recipeData">
               
               <div class="font-bold text-xl mb-1">${lable}</div>
               <p class="text-sm text-grey-dark flex items-center mb-2">Source:<span id="source">${source}</span></p>
               
               
                ${ingredientsDiv}
                ${moreIngredientsDiv}

                <br>
                <button  data-url="${url}" data-imageURL="${imageURL}" data-healthLabels="${healthLabels}" data-lable="${lable}" data-source="${source}" data-ingredients="${ingredients}" data-totalNutrients='${JSON.stringify(totalNutrients)}' data-totalDaily='${JSON.stringify(totalDaily)}'
                        class="saveToAccount shadow appearance-none border rounded w-4/5 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline">Save</button>
                <button  data-url="${url}" data-imageURL="${imageURL}" data-healthLabels="${healthLabels}" data-lable="${lable}" data-source="${source}" data-ingredients="${ingredients}"
                        class="goToRecipe shadow appearance-none border rounded w-4/5 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline">Show Recipe</button>
                <button class="showTotalNutrients shadow appearance-none border rounded w-4/5 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline">Show Nutrition</button>
           </div>
           ${healthLabelsDiv}
           ${totalNutrientsDiv.prop('outerHTML')}
       </div>`
        //TODO: share to social media

        this.append(newCardDiv);
    }
})


jQuery.fn.extend({
    showLoginSection: function () {
        const loginDiv = $(`<form id="loginForm area" autocomplete="off" class="loginForm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p class="absolute mr-5 pin-r closelogin">x</p>
        <div id="signinWithGoogle"><span id="googleIcon"></span></div>

        <label id="firstNameLabel" for="firstname" class="block text-grey-darker text-sm font-bold mt-3 mb-1">FirstName</label>
        <input id="firstname" type="text" placeholder="FirstName"
        class="shadow appearance-none border rounded w-4/5 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline">
        <label id="lastNameLabel" for="lastname" class="block text-grey-darker text-sm font-bold mt-3 mb-1">LastName</label>
        <input id="lastname" type="text" placeholder="LastName"
        class="shadow appearance-none border rounded w-4/5 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline">
        
        <label for="email" class="block text-grey-darker text-sm font-bold mt-3 mb-1">Email</label>
        <input id="email" type="text" placeholder="Email"
        class="shadow appearance-none border rounded w-4/5 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline">
        <label for="password" class="block text-grey-darker text-sm font-bold mt-3 mb-1">Password</label>
        <input id="password" type="password" placeholder="Password"
        class="shadow appearance-none border rounded w-4/5 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline">
        <br>

        <label id="confirmPasswordLabel" for="confirmPassword" class="block text-grey-darker text-sm font-bold mt-3 mb-1">Password</label>
        <input id="confirmPassword" type="password" placeholder="Confrim Password"
            class="shadow appearance-none border rounded w-4/5 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline">
        <br>

        <input type="submit" value="Login" id="loginBtn"
            class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 mt-3 mb-1 rounded focus:outline-none focus:shadow-outline"></input>
        
        <span id="signupSpan">
        <span>or </span>
        <a id="signupBtn"
        class="font-bold mt-3 mb-1 focus:shadow-outline">SignUp</a>
        </span>
        
    <ul class="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
        </ul>
        
        </form>`)
    loginDiv.css({
        position:"fixed",
        top:"20%",
        left:"20%",
        right:"20%",
        zIndex:100
    })
    this.prepend(loginDiv)
    }
})



jQuery.fn.extend({
    showHealthLabels: function (activeLabels) {
        //activeLabels is array of active labels
        

        let healthLabelsDiv = `<div class="px-6 py-4 text-left">`;

        healthLabels.forEach(function (val) {
            if(activeLabels && activeLabels.indexOf(val) !== -1){
                healthLabelsDiv += `<span class="active `
            }else{
                healthLabelsDiv += `<span class="`
            }
            healthLabelsDiv += `healthLabels bg-grey-light text-grey-darkest py-1 px-2 rounded-full inline-flex items-center" data="${val}">${val}</span>`
        })
        healthLabelsDiv += "</div>";


        const healthLabelsSelectionDiv = $(`<form id="healthLabelsDiv" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <h2>Please chose your diet restrictions and preferences:</h2>
                            ${healthLabelsDiv}
                            <button id="saveDietBtn"
                                class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 mt-3 mb-1 rounded focus:outline-none focus:shadow-outline">Save</button>
                            </form>`)
        healthLabelsSelectionDiv.css({
            position: "fixed",
            top: "20%",
            left: "20%",
            right: "20%",
            zIndex: 100
        })
        this.append(healthLabelsSelectionDiv);
        
    }
})