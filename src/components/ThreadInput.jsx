import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function ThreadInput({ addThread }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addThread({ title, body, category });
  };

  return (
    <form className="input-group" onSubmit={onSubmitHandler}>
      <label htmlFor="title">
        Judul
        <input
          type="text"
          id="title"
          value={title}
          onChange={onTitleChange}
          placeholder="Judul thread"
          required
        />
      </label>
      <label htmlFor="category">
        Kategori
        <input
          type="text"
          id="category"
          value={category}
          onChange={onCategoryChange}
          placeholder="Kategori"
        />
      </label>
      <label htmlFor="body">
        Isi Diskusi
        <textarea
          id="body"
          value={body}
          onChange={onBodyChange}
          placeholder="Apa yang ingin Anda diskusikan?"
          required
          rows="5"
        />
      </label>
      <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
        Buat Thread
      </button>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
