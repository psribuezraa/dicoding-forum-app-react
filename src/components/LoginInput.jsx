import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form className="input-group" onSubmit={onSubmitHandler}>
      <label htmlFor="email">
        Email
        <input
          type="email"
          id="email"
          value={email}
          onChange={onEmailChange}
          placeholder="Email"
          required
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="Password"
          required
        />
      </label>
      <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
        Login
      </button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
