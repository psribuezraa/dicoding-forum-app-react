import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ThreadInput from '../components/ThreadInput';
import { asyncAddThread } from '../states/threads/threadsSlice';

function AddThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThread = async ({ title, body, category }) => {
    const isSuccess = await dispatch(asyncAddThread({ title, body, category }));
    if (isSuccess) {
      navigate('/');
    }
  };

  return (
    <section className="form-container" style={{ maxWidth: '600px' }}>
      <h2 className="form-title">Buat Diskusi Baru</h2>
      <ThreadInput addThread={onAddThread} />
    </section>
  );
}

export default AddThreadPage;
