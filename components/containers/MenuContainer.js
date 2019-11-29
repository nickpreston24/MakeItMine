import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(6, 0, 3),
    },
}));

const MenuContainer = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className="menu">
                <button id="close-menu">Close</button>
                <a href="#" id="login-link">Login</a>
                <a href="#" id="signup-link">SignUp</a>
            </div>
        </div>
    );
}

export default MenuContainer;