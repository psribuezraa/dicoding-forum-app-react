import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import asyncRegisterUser from '../states/authUser/registerThunk';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async ({ name, email, password }) => {
    const isSuccess = await dispatch(asyncRegisterUser({ name, email, password }));
    if (isSuccess) {
      navigate('/login');
    }
  };

  return (
    <section className="form-container">
      <h2 className="form-title">Create your Account</h2>
      <RegisterInput register={onRegister} />
      <p className="auth-link">
        Already have an account?
        {' '}
        <Link to="/login">Login here</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
