import fetch from 'isomorphic-unfetch';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { recipesController } from '../../controllers';
import dummyData from './../data';

const Recipes = ({ recipes }) => {
  // console.log('recipes', recipes)
  return (
    <Layout>
      <h1>Your Recipes</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <Link href="/recipes/[id]" as={`/recipes/${recipe.id}`}>
              <a>{recipe.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

Recipes.getInitialProps = async ({ req }) => {
  // const response = await fetch('https://localhost:PORT');
  // response.catch(console.warn);
  // const data = await response.json();

  let userId = 123;
  
  let data = recipesController.find({ userId });

  console.log(data ? data : `No data for user # ${userId} from neo4j.`);
  console.log(`Recipes found for user ${"Mike"}: ${data ? data.length : 0}`);
  
  if(!data) 
    data = dummyData;

  return {
    recipes: data.map(entry => entry)
  };
}

export default Recipes;