//USE: 
//this function appens the card based on input recipe object and append it to div
// use like $("#muDiv").appendRecipeToDiv(recipeObject)

jQuery.fn.extend({
    appendRecipeToDiv: function (recipe) {
        const url = recipe.url || "";
        const imageURL = recipe.imageURL || "";
        const healthLabels = recipe.healthLabels || "";
        const lable = recipe.lable || "can't find lable";
        const source = recipe.source || "Unkown Source";
        const ingredients = recipe.ingredients || "can't find ingredients";

        let healthLabelsDiv = `<div class="px-6 py-4 text-left">`;

        healthLabels.forEach(function (val) {
            healthLabelsDiv += `<span class="bg-grey-light text-grey-darkest py-1 px-2 rounded-full inline-flex items-center">${val}</span>`
        })
        healthLabelsDiv += "</div>";



        const newCardDiv =
            `<div class="inline-flex flex-wrap w-fullrounded overflow-hidden shadow-lg mx-auto p-2">
             <div class="lg:w-1/3 text-center mx-auto">
                   <img class="m-auto"
                   src="${imageURL}"
                   alt="Chicken Noodle Soup">
                    ${healthLabelsDiv}
           </div>
          
           <div class="lg:w-2/3 px-6 py-4" id="recipeData">
               
               <div class="font-bold text-xl mb-1">${lable}</div>
               <p class="text-sm text-grey-dark flex items-center mb-2">Source:<span id="source">${source}</span></p>
               
               
               <p class="text-grey-darker text-base">
                      ${ingredients}
               </p>
                <br>
               <button id="saveToAccount" "data-url"="${url}" "data-imageURL"="${imageURL}" "data-healthLabels"="${healthLabels}" "data-lable"="${lable}" "data-source"="${source}" "data-ingredients"="${ingredients}"
                        class="shadow appearance-none border rounded w-4/5 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline">Save</button>
           </div>
       </div>`


        //    console.log(newCardDiv);
        this.append(newCardDiv);
    }
})


jQuery.fn.extend({
    showLoginSection: function () {
        const loginDiv = $(`<form id="loginForm" autocomplete="off" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <button class="absolute mr-5 pin-r" id="closelogin">x</button>
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
                        <input type="submit" value="Login" id="loginBtn"
                            class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 mt-3 mb-1 rounded focus:outline-none focus:shadow-outline"></input>
                        
                        <span id="signupSpan">
                            <span>or </span>
                            <a id="signupBtn"
                                class="font-bold mt-3 mb-1 focus:shadow-outline">SignUp</a>
                        </span>

                        
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