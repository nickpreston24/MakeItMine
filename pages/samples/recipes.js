import fetch from 'isomorphic-unfetch'

const Recipes = ({ stars }) => {
  return <div>Next recipes: {stars}</div>
}

Recipes.getInitialProps = async ({ req }) => {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')  
  const data = await res.json();

  console.log(`Shows found: ${data.length}`)

  return {
    shows: data.map(entry => entry.show)
  };
}

export default Recipes