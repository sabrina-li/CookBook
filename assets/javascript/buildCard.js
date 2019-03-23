//USE: 
//this function appens the card based on input recipe object and append it to div
// use like $("#muDiv").appendRecipeToDiv(recipeObject)

jQuery.fn.extend({
    appendRecipeToDiv: function (recipe) {
        let imageURL = recipe.imageURL || "";
        let healthLabels = recipe.healthLabels || "";
        let lable = recipe.lable || "can't find lable";
        let source = recipe.source || "Unkown Source";
        let ingredients = recipe.ingredients || "can't find ingredients";

        let healthLabelsDiv = `<div class="px-6 py-4 text-left">`;

        healthLabels.forEach(function (val) {
            healthLabelsDiv += `<span class="bg-grey-light text-grey-darkest py-1 px-2 rounded-full inline-flex items-center">${val}</span>`
        })
        healthLabelsDiv += "</div>";



        let newCardDiv =
            `<div class="inline-flex flex-wrap w-fullrounded overflow-hidden shadow-lg mx-auto p-2">
           <div class="lg:w-1/3 text-center mx-auto">
                   <img class="m-auto"
                   src="${imageURL}"
                   alt="Chicken Noodle Soup">
                    ${healthLabelsDiv}
           </div>
          
           <div class="lg:w-2/3 px-6 py-4">
               
               <div class="font-bold text-xl mb-1">${lable}</div>
               <p class="text-sm text-grey-dark flex items-center mb-2">Source:<span id="source">${source}</span></p>
               
               
               <p class="text-grey-darker text-base">
                      ${ingredients}
               </p>
           </div>
       </div>`


        //    console.log(newCardDiv);
        this.append(newCardDiv);
    }
})







