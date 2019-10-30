// Delete EVERYTHING:
match (r) detach delete r

// Create a series of ingredients
foreach (ingredient in ["Tomato Sauce", "Parmesean Cheese", "Spaghetti", "Pepperoni", "Anchovies", "Black Olives", "Green Olives", "Marinara Sauce", "Barbeque Sauce", "Sausage", "Canadian Bacon", "Turkey Bacon"] |
merge (r:Ingredient {title:ingredient}));

// Create a series of recipes
foreach (recipeName in ["Lasagna", "Fried Zucchini","Spaghetti", "Pizza", "Stromboli", "Cannoli"] |
merge (r:Recipe {title:recipeName}));

// Create a Person:
merge (u:Person {firstName:'Mary', lastName:'Sue'})
merge (r:Recipe {title:'Lasagna'}) 
merge (r)-[:Authored_By {created: date()}]->(u)<-[:Likes {created: date()}]->(r);

match (f:Person {firstName:"Mary", lastName:"Sue"})
merge (u:Person {firstName:'Mark', lastName:'Johnson'})
merge (r:Recipe {title:'Lasagna'})
merge(f)-[:Friend]->(u);

// Link Mr Johnson to each recipe
match (p:Person {lastname: "Johnson"})
foreach (recipeName in ["Spaghetti", "Pizza", "Stromboli", "Cannoli"] | 
merge (p)-[:Likes {created: date()}]->(:Recipe {title:recipeName}));

// "What's a recipe between friends?" (Like your friend's recipe)
match (a {firstName: 'Mark', lastName:'Johnson'})<-[:Friend]-(friends)<-[:Authored_By]-(recipe:Recipe{title:"Lasagna"})
merge (a)-[:Likes]->(recipe)
return a, friends, recipe;

// TODO: Build a Pizza:


// TODO: create a 'Tweak_Of' relationship between one recipe to another
// If a recipe has no authors or tweaks, soft delete it

// Indexes:
create index on :Person(firstName,lastname);
create index on :Recipe(title);


// Display:
match (r) return r;