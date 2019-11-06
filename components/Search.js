import React, { useState, useEffect } from 'react';
import { makeStyles, TextField, Checkbox, withStyles, FormControlLabel } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import SubmitButton from './SubmitButton';
import { RecipeLink, RecipeReviewCard } from '../components'

// require('dotenv').config()
// console.log(process.env.EDAMAME_APIKEY);
//TODO: move key to environment variables
const apiKey = "38d3947a3f2af312047999390586a0ad";
const appID = "2ff8e6f6";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        // width: theme.spacing(.5) * 100,
    },
    input: {
        display: 'none',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: theme.spacing(.5) * 100,
    },
}));

const SearchBar = () => {
    const classes = useStyles();
    const [recipes, setRecipes] = useState([]);
    // useEffect(() => {

    // });

    return (
        <div>
            <TextField
                id="recipe-search-box"
                label="Find Recipes, e.g. 'Lasagna'"
                type="search"
                className={classes.textField}
                margin="normal"
                variant="outlined"
            />
            <br />
            <br />
            <SubmitButton
                action={async () => {
                    const results = await searchEdamame(document.getElementById("recipe-search-box").value)
                    // console.log('inner results', results.recipes);
                    setRecipes(results.recipes);
                }}
                text="Search"
                className={classes.button}
            />
            <RecipePicker recipes={recipes} />
        </div>
    );
}

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})(props => <Checkbox color="default" {...props} />);

const RecipePicker = ({ recipes }) => {

    const [state, setState] = React.useState({
        // checkedA: true,
        // checkedB: true,
        // checkedF: true,
        // checkedG: true,
    });

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
        console.log('Current state (Picker)', state);
    };

    return (
        <div>
            {
                recipes
                    ? recipes.map(recipe => {
                        return (
                            <div>
                                {/* <FormControlLabel
                                    control={
                                        <GreenCheckbox
                                            checked={state.checkedG}
                                            onChange={handleChange('checkedG')}
                                            value="checkedG"
                                        />
                                    }
                                // label={recipe}
                                />
                                <br /> */}
                                <RecipeReviewCard/>
                                {/* <RecipeLink recipe={recipe} key={recipe.uri} /> */}
                            </div>
                        )
                    })
                    : <div />
            }
            {/* <SubmitButton text="Add Selected" /> */}
        </div>
    )
};

async function saveRecipes({ recipes }) {
    //TODO: Api call goes here
}

async function searchEdamame(params) {
    console.log(`searching for ${params}`)
    const query = `https://api.edamam.com/search?q=${params}&app_id=${appID}&app_key=${apiKey}`;
    const response = await fetch(query);
    const data = await response.json();

    console.log('edamam search data: ', data);

    return {
        recipes: data.hits.map(hit => hit.recipe)
    }
}

export default SearchBar;

