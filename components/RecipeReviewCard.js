import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LinkIcon from '@material-ui/icons/Link';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ShareIcon from '@material-ui/icons/Share';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

import RecipeLink from './RecipeLink';
import { Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
        width: "100%",
        borderTopLeftRadius: '3px'
        // border-top-right-radius: 3px;
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    article: {
        width: '100%',
        position: relative,
        height: "calc(100vh - 100px)",
        "max-height": "calc(100vh - 100px)",
        padding: "50px 0",
        display: flex,
        "flex-direction": column,
        "justify-content": flex - start,
        "text-align": center,
    },
    recipeName: {
        "font-weight": bold,
    }
}));

export default function RecipeReviewCard({ recipe } = {}) {

    const {
        url, title, description,
        ingredients, instructions,
        source, date, image } = recipe;

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    // console.log(recipe);

    const onExpand = () => {
        setExpanded(!expanded);
    };

    //  const preventDefault = event => event.preventDefault();

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {title.slice(0, 1)}
                    </Avatar>
                }
                title={title}
                subheader="September 14, 2016"
            />
            <CardMedia
                className={classes.media}
                image={image}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton>
                    <LinkIcon>
                        {/* TODO: link to given recipe url */}
                        {/* <Link href={url} onClick={preventDefault} /> */}
                    </LinkIcon>
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={onExpand}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {ingredients.map((line, idx) => <Typography key={idx} paragraph>{line.text}</Typography>)}
                </CardContent>
                <CardContent>
                    {instructions.map((line, idx) => <Typography paragraph>{line}</Typography>)}
                </CardContent>
            </Collapse>
        </Card>
    );
}