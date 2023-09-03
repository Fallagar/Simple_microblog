import "./Page.styles.scss";

const Login = () => {
  return (
    <form action="/auth/api/login" method="post" className="login-form">
      <div className="login-form__title">Welcome to Bloggr!</div>
      <label htmlFor="email">Email</label>
      <input name="email" type="email" required />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" required minLength={6} />
      <div>
        <button type="submit">Sign In</button>
        <button formAction="/auth/api/signup">Sign Up</button>
      </div>
      <div className="login-form__title"></div>
    </form>
  );
};

export default Login;
