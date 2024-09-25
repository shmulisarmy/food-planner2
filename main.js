const recipes = [
    { 
        name: "Hamburger", 
        ingredients: new Map([
            ["Bread", 2],
            ["Beef", 1],
            ["Lettuce", 1],
            ["Tomato", 1],
            ["Cheese", 1]
        ]),
        imageUrl: "https://via.placeholder.com/300x200?text=Hamburger"
    },
    { 
        name: "Pizza", 
        ingredients: new Map([
            ["Crust", 1],
            ["Sauce", 1],
            ["Cheese", 1],
            ["Pepperoni", 2],
            ["Onions", 1],
            ["Olives", 1]
        ]),
        imageUrl: "https://via.placeholder.com/300x200?text=Pizza"
    },
    { 
        name: "Taco", 
        ingredients: new Map([
            ["Tortilla", 2],
            ["Ground Beef", 1],
            ["Lettuce", 1],
            ["Tomato", 1],
            ["Cheese", 1],
            ["Sour Cream", 2]
        ]),
        imageUrl: "https://via.placeholder.com/300x200?text=Taco"
    },
    { 
        name: "Pasta", 
        ingredients: new Map([
            ["Pasta", 200], // in grams
            ["Tomato Sauce", 1],
            ["Garlic", 2],
            ["Olive Oil", 1],
            ["Parmesan Cheese", 50], // in grams
            ["Basil", 1]
        ]),
        imageUrl: "https://via.placeholder.com/300x200?text=Pasta"
    },
    { 
        name: "Caesar Salad", 
        ingredients: new Map([
            ["Romaine Lettuce", 2],
            ["Croutons", 1],
            ["Caesar Dressing", 1],
            ["Parmesan Cheese", 50],
            ["Chicken Breast", 1]
        ]),
        imageUrl: "https://via.placeholder.com/300x200?text=Caesar+Salad"
    },
    { 
        name: "Sushi", 
        ingredients: new Map([
            ["Sushi Rice", 200],
            ["Nori Sheets", 2],
            ["Fish (Salmon/Tuna)", 100],
            ["Avocado", 1],
            ["Cucumber", 1],
            ["Soy Sauce", 1]
        ]),
        imageUrl: "https://via.placeholder.com/300x200?text=Sushi"
    },
    { 
        name: "Chocolate Cake", 
        ingredients: new Map([ 
            ["Flour", 200], // in grams
            ["Cocoa Powder", 50],
            ["Sugar", 150],
            ["Eggs", 3],
            ["Butter", 100],
            ["Baking Powder", 1]
        ]),
        imageUrl: "https://via.placeholder.com/300x200?text=Chocolate+Cake"
    },
];
const availableIngredients = new Map([
    ["Bread", Math.floor(Math.random() * 10) + 1],
    ["Beef", Math.floor(Math.random() * 5) + 1],
    ["Lettuce", Math.floor(Math.random() * 10) + 1],
    ["Tomato", Math.floor(Math.random() * 5) + 1],
    ["Cheese", Math.floor(Math.random() * 10) + 1],
    ["Crust", Math.floor(Math.random() * 5) + 1],
    ["Sauce", Math.floor(Math.random() * 10) + 1],
    ["Cheese", Math.floor(Math.random() * 10) + 1],
    ["Pepperoni", Math.floor(Math.random() * 5) + 1],
    ["Onions", Math.floor(Math.random() * 10) + 1],
    ["Olives", Math.floor(Math.random() * 5) + 1],
    ["Tortilla", Math.floor(Math.random() * 10) + 1],
    ["Ground Beef", Math.floor(Math.random() * 5) + 1],
    ["Lettuce", Math.floor(Math.random() * 10) + 1],
    ["Tomato", Math.floor(Math.random() * 5) + 1],
    ["Cheese", Math.floor(Math.random() * 10) + 1],
    ["Sour Cream", Math.floor(Math.random() * 5) + 1],
    ["Pasta", Math.floor(Math.random() * 50) + 1],
    ["Tomato Sauce", Math.floor(Math.random() * 10) + 1],
    ["Garlic", Math.floor(Math.random() * 5) + 1],
    ["Olive Oil", Math.floor(Math.random() * 10) + 1],
]);


const recipesMaking = new Map([
    ["Hamburger", 0],
    ["Pizza", 0],
    ["Taco", 0],
    ["Pasta", 0],
    ["Caesar Salad", 3],
    ["Sushi", 2],
    ["Chocolate Cake", 0],
]);




document.addEventListener('alpine:init', () => {
    Alpine.data('recipesMaking', () => ({
        recipesMaking
    }));
})


document.addEventListener('alpine:init', () => {
    Alpine.data('availableIngredients', () => ({
        availableIngredients
    }));
})


document.addEventListener('alpine:init', () => {
    Alpine.data('recipes', () => ({
        recipesMaking,
        recipes,
        selectedRecipe: recipes[0],
        availableIngredients,
        selectRecipe(recipe) {
            this.selectedRecipe = recipe;
        },
        canMakeRecipe(recipe) {
            console.log("canMakeRecipe called")
            for (const [ingredient, amount] of recipe.ingredients.entries()) {
                if (!this.availableIngredients.has(ingredient)) {
                    return false;
                }
                if (this.availableIngredients.get(ingredient) < amount) {
                    return false;
                }
            }
            console.log("canMakeRecipe returned true")
            return true;
        },
        makeRecipe(recipe) {
            console.log("makeRecipe called")
            console.log(recipe)
            for (const [ingredient, amount] of recipe.ingredients.entries()) {
                this.availableIngredients.set(ingredient, availableIngredients.get(ingredient) - amount);
            }
            this.recipesMaking.set(recipe.name, recipesMaking.get(recipe.name) + 1);
        },
        unMakeRecipe(recipe) {
            console.log("unMakeRecipe called")
            console.log(recipe)
            for (const [ingredient, amount] of recipe.ingredients.entries()) {
                this.availableIngredients.set(ingredient, availableIngredients.get(ingredient) + amount);
            }
            this.recipesMaking.set(recipe.name, recipesMaking.get(recipe.name) - 1);
        },
        isMakingRecipe(recipe) {
            if (!this.recipesMaking.has(recipe.name)) {
                return false;
            }
            return this.recipesMaking.get(recipe.name) > 0;
        }
    }));
})


