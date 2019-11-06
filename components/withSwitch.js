const [state, setState] = React.useState({
    toggleA: true,
    toggleB: true,
});

const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
};

export default withToggleSwitch => Component =>
    <Switch
        checked={state.toggleA}
        onChange={handleChange('stateA')}
        value="stateA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
    >
        <Component />
    </Switch>

// More switch fun: https://material-ui.com/components/switches/