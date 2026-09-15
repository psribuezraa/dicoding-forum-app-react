import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <form className="input-group" onSubmit={onSubmitHandler}>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          value={name}
          onChange={onNameChange}
          placeholder="Name"
          required
        />
      </label>
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
          minLength="6"
          required
        />
      </label>
      <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
        Register
      </button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
