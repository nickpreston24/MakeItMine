import Layout from '../../components/Layout';
import dummyData from '../data';

const Recipe = ({ recipe }) => {
    console.log("specific recipe:", recipe);
    return (
        <Layout>
            {recipe ?
                <div>
                    <h1>{recipe.name}</h1>
                    <p>{`Created by ${recipe.author.name}`}</p>
                    {recipe.image && <img src={recipe.image} />}
                </div>
                : <h2>Something went wrong :(. We were not able to retreive this recipe!  Sorry about that.</h2>}
        </Layout>
    );
};

/* TODO: fetch by Id from Neo4j
*
* below is a sample:
*/

Recipe.getInitialProps = async function (context) {
    const { id } = context.query;

    /** TODO: Fetch from Neo4j */
    // const response = await fetch()
    // const dbData = await response.json();
    // console.log(dbData || `No data for recipe # ${id} from neo4j.`);

    let recipe = dummyData.find(recipe => recipe.id == id);
    console.log(`Recipe # ${id}`, recipe);
    return { recipe };
}

export default Recipe;