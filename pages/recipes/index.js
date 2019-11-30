import { Layout, RecipeLink, RecipeSearchBar } from '../../components';
import { recipesController } from '../../controllers';

const Recipes = ({ recipes }) => {
  // console.log('recipes', recipes)  

  return (
    <Layout>

      <h2>Recipe Search</h2>
      
      <RecipeSearchBar />

      <h2>Your Recipes</h2>
      {recipes && recipes.map(recipe => <RecipeLink key={recipe.id} recipe={recipe} />)}
    </Layout>
  );
}

Recipes.getInitialProps = async () => {

  const data = await recipesController.get();

  return {
    recipes: data
  };
}

export default Recipes;