import Layout from '../../components/Layout';
import { recipesStore } from '../../controllers';

const Recipe = ({ recipe } = {}) => {

    const { author, image, title } = recipe;

    return (
        <Layout>
            {recipe ?
                <div>
                    <h1>{title}</h1>
                    {author && author.name && <p>{`Created by ${author.name}`}</p>}
                    {image && <img src={image} />}
                </div>
                : <h2>Something went wrong!  We were not able to retreive this recipe, sorry about that :(</h2>}
        </Layout>
    );
};

/* 
* Initialize
*/
Recipe.getInitialProps = async function (context) {
    const id = context.query.id;
    const recipe = await recipesStore.findById(id);

    // console.log(`Recipe # ${id}`, recipe);
    return { recipe };
}

export default Recipe;