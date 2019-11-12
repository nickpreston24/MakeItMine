const SignupModal = () => (
    <div id="signup-modal" className="display-none">
    <div id="signup-form-div">
        <p>sign-up</p>
        <form id="signup-form">
            <label for="signup-form-email">Email</label>
            <input type="email" id="signup-form-email"/>
            <label for="signup-form-password">Password</label>
            <input type="password" id="signup-form-password"/>
            <label for="signup-form-password-confirm">Confirm Password</label>
            <input type="password" id="signup-form-password-confirm"/>
            <input type="submit" id="signup-form-submit"/>
        </form>
        <a href="#" id="cancel-signup">Cancel</a>
    </div>
</div>
);

export default SignupModal;