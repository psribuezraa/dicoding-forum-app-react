import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/authUserSlice';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <section className="form-container">
      <h2 className="form-title">Login to Dicoding Forum</h2>
      <LoginInput login={onLogin} />
      <p className="auth-link">
        Don&apos;t have an account?
        {' '}
        <Link to="/register">Register here</Link>
      </p>
    </section>
  );
}

export default LoginPage;
