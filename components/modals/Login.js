const LoginModal = () => (
    <div id="login-modal" className="display-none">
        <div id="login-form-div">
            <p>login</p>
            <form id="login-form">
                <label htmlFor="login-form-email">Email</label>
                <input type="email" id="login-form-email"/>
                <label htmlFor="login-form-password">Password</label>
                <input type="password" id="login-form-password"/>
                <input type="submit" id="login-form-submit"/>
            </form>
            <a href="#" id="cancel-login">cancel</a>
        </div>

    </div>
);

export default LoginModal;
