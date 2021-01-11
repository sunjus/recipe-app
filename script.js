const searchForm=document.querySelector('form');
const searchResultDiv=document.querySelector('.search-result');
const container=document.querySelector('.container');
const sortBtn=document.querySelector('button');
const APP_ID='e5409c43';
const APP_KEY='8f69a6767790266402af6aa10c39749d';

let sortOrder = 1;
let foodList = [];

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchQuery=e.target.querySelector('input').value;
    console.log(searchQuery);
    fetchRecipesAndRender(searchQuery); 
});

sortBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    sortOrder = -sortOrder;
    console.log(sortOrder)
    generateHTML(foodList);   
})

async function fetchRecipesAndRender(searchQuery){
    const baseURL = 'https://api.edamam.com/';
    const apiURL=`${baseURL}search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
    const response = await fetch(apiURL);
    console.log(response);
    const data = await response.json();
    console.log(data);
    foodList = data.hits
    generateHTML(foodList);
};

function generateHTML(results){
    results.sort((a,b) => a.recipe.label > b.recipe.label ? sortOrder : -sortOrder)
    let generatedHTML='';
    results.map(result=>{
        generatedHTML+= `
                <div class="item">
                    <img src="${result.recipe.image}" alt="">
                    <div class="flex-container">
                        <h1 class="title">${result.recipe.label}</h1>
                        <a class='view-button' href="${result.recipe.url}" target='_blank'>View Recipe</a>
                    </div>                    
                    <p class="item-data">Calories : ${result.recipe.calories.toFixed(2)}</p>
                    <p class='item-data'>DietLabels : ${result.recipe.dietLabels.length >0 ? result.recipe.dietLabels :'No data found '}<p>
                </div>
        `
    })
    searchResultDiv.innerHTML=generatedHTML;
}

fetchRecipesAndRender('strawberry');