var mealKits = [
    {
        title: "Omelet with mushrooms, spices and cheese",
        includes: "parsel and pepper",
        description: "Eggs, milk, cheese, mushrooms, salt, spices",
        category: "Classic Meals",
        price: 15.60,
        cookingTime: 15,
        servings: 2,
        imageUrl: "/images/recept1.jpg",
        topMeal: true
    },
    {
        title: "Soup with shrimp and broccoli",
        includes: "milk",
        description: "Chicken broth, milk, broccoli florets, raw shrimp,cheddar cheese, garlic powder, salt & pepper",
        category: "Classic Meals",
        price: 22.80,
        cookingTime: 25,
        servings: 4,
        imageUrl: "/images/recept2.jpg",
        topMeal: true
    },
    {
        title: "Ratatouille",
        includes: "pepper",
        description: "Red bell pepper, eggplant, zucchini, crushed tomatoes, olive oil, garlic, salt & pepper",
        category: "Classic Meals",
        price: 17.50,
        cookingTime: 35,
        servings: 4,
        imageUrl: "/images/recept4.jpg",
        topMeal: true
    },
    {
        title: "Creamy Vegan Pasta",
        includes: "Pine nuts & nutritional yeast.",
        description: "White beans, onion, olive oil, pasta, broccoli, pine nuts, nutritional yeast, vegetable broth",
        category: "Vegan Meals",
        price: 13.20,
        cookingTime: 20,
        servings: 4,
        imageUrl: "/images/recept3.jpg",
        topMeal: false
    },
    {
        title: "Best Buddha Bowl",
        includes: "beans, turmeric tahini sauce & sesame seeds",
        description: "sweet potatoes, red cabbage, olive oil, watermelon redish, carrot,quinoa, kale leaves,microgreens  ",
        category: "Vegan Meals",
        price: 11.99,
        cookingTime: 24,
        servings: 4,
        imageUrl: "/images/recept5.jpg",
        topMeal: false
    },
    {
        title: "Broccoli-Stuffed Chicken",
        includes: "whte pepper and curry powder",
        description: "skinless chicken breast, garlic, salt, broccoli, cheddar cheese",
        category: "Classic Meals",
        price: 16,
        cookingTime: 55,
        servings: 2,
        imageUrl: "/images/recept6.jpg",
        topMeal: false
    }

];

module.exports.getAllMealKits = function() {
    return mealKits;
};


module.exports.getTopMealkits = function() {
    let filtered = [];

    for(let i=0; i<mealKits.length; i++){
        if(mealKits[i].topMeal){
            filtered.push(mealKits[i]);
        }
    }

    return filtered;
};


//module.exports.getMealsByCategory = function() {
  //  let cat1 =[];

    // for (let i=0; i<mealKits.length;i++){
    //     if(mealKits[i].category.includes('Classic Meals')==true) {
    //         cat1.push(mealKits[i]);
    //     }
    // }

    // return cat1;

 //   for(const item of mealKits) {
 //       if(mealKits.price ==16 )cat1.push(item)

//    }
//    return cat1;
//};