import Link from 'next/link';
//Holds the <a> for a given Recipe

const RecipeLink = ({ recipe }) => {

    const { id, title, url } = recipe || {};

    return (
        <li>
            {
                id
                    ? //Internal Link
                    <Link href="/recipes/[id]" as={`/recipes/${id}`}>
                        <a>{title}</a>
                    </Link>
                    :  //External link
                    <a href={url}>{title}</a>

            }

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

    )
};

export default RecipeLink;