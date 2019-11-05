import Link from 'next/link';
//Holds the <a> for a given Recipe

const RecipeLink = ({ post: recipe }) => (
    <li>
        <Link href="/r/[id]" as={`/r/${recipe.id}`}>
            <a>{recipe.title}</a>
        </Link>
        <style jsx>{`
            li {
                list-style: none;
                margin: 5px 0;
            }

            a {
                text-decoration: none;
                color: blue;
                font-family: 'Arial';
            }

            a:hover {
                opacity: 0.6;
            }
    `}</style>
    </li>

);

export default RecipeLink;