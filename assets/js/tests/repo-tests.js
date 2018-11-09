/*	Author: Michael Preston
 *	Created Date: "11-04-2018" 
 */

/**
 * Tests
 * Uncomment to use individual tests as part of the pre-loaded JS.
 */
const testUID = "elSj3E7klfTPxWcyBNE4JzYCfek1";
var testrepo = new recipeRepo(testUID);

testrepo.write(
    "Macaroni & cheez",
    ["macaroni", "cheese"],
    "Melt cheese on stovetop, cook elbow pasta for 4 mins in boiling water. Pour cheese onto elbow pasta",
    "00:01",
    "00:05",
)

var recipe = {
    name: "chicken marsala",
    ingredients: ["chicken", "sause", "cheese"],
    directions: `Put the chicken breasts side by side on a cutting board and lay a piece of plastic wrap over them; pound with a flat meat mallet, until they are about 1/4-inch thick. Put some flour in a shallow platter and season with a fair amount of salt and pepper; mix with a fork to distribute evenly.
Heat the oil over medium-high flame in a large skillet. When the oil is nice and hot, dredge both sides of the chicken cutlets in the seasoned flour, shaking off the excess. Slip the cutlets into the pan and fry for 5 minutes on each side until golden, turning once – do this in batches if the pieces don't fit comfortably in the pan. Remove the chicken to a large platter in a single layer to keep warm.
Lower the heat to medium and add the prosciutto to the drippings in the pan, saute for 1 minute to render out some of the fat. Now, add the mushrooms and saute until they are nicely browned and their moisture has evaporated, about 5 minutes; season with salt and pepper. Pour the Marsala in the pan and boil down for a few seconds to cook out the alcohol. Add the chicken stock and simmer for a minute to reduce the sauce slightly. Stir in the butter and return the chicken to the pan; simmer gently for 1 minute to heat the chicken through. Season with salt and pepper and garnish with chopped parsley before serving.`,
    prepTime: "00:30",
    cookTime: "01:30",
};

recipe.uid = testUID;
testrepo.add(recipe);

recipe = {
    name: "chicken marsala",
    ingredients: ["low-fat, cruelty free, no-fun, tofu-chicken", "sause", "cheese"],
    directions: "assemble tofu chicken;  toss in trash; buy real chickin",
    prepTime: "00:25",
    cookTime: "01:23",
};

testrepo.amend(recipe);

recipe.starred = true;
testrepo.amend(recipe);

testrepo.get(function (recipe) {
    recipe.name !== "fireball sushi"
}).then(function (result) {
    console.log(result)
});
testrepo.get(function (recipe) {
    recipe.starred
}).then(function (result) {
    console.log(result)
});
testrepo.get().then(function (results) {
    console.log(results)
})

testrepo.write("tomato soup", "tomatoes", "blah", true);