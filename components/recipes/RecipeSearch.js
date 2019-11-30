import React, { useState, useEffect } from 'react';
import { makeStyles, TextField, Checkbox, withStyles, FormControlLabel } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import SubmitButton from '../buttons/SubmitButton';
import { RecipeLink, RecipeReviewCard } from '..'
import { recipesController } from '../../controllers';
import { Recipe } from '../../models'

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

const RecipeSearchBar = () => {
    const classes = useStyles();
    const [recipes, setRecipes] = useState([]);

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
                    const results = await recipesController.searchNutrition(document.getElementById("recipe-search-box").value)                    
                    setRecipes(results);
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

    // console.log('initial state (Picker)', recipes);


    const [state, setState] = React.useState({
        // checkedA: true,
        // checkedB: true,
        // checkedF: true,
        // checkedG: true,
    });

    async function saveRecipes({ recipes }) {
        //TODO: Api call goes here
    }

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
        console.log('Current state (Picker)', state);
    };

    return (
        recipes
            ? recipes.map(recipe => <RecipeReviewCard key={recipe.url} recipe={recipe} />)
            : <div />
    )
};




export default RecipeSearchBar;

