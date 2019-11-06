// import fetch from 'isomorphic-unfetch';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { recipesController } from '../../controllers';
import dummyData from './../data';

const Recipes = ({ recipes }) => {
  console.log('recipes', recipes)
  return (
    <Layout>
      <h1>Your Recipes</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <Link href="/recipes/[id]" as={`/recipes/${recipe.id}`}>
              <a>{recipe.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

Recipes.getInitialProps = async () => {

  let data = await recipesController.getAll();

  //TODO: remove, or ignore in production mode.
  if (!data)
    data = dummyData;

  return {
    recipes: data
  };
}

export default Recipes;