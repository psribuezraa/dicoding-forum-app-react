import PropTypes from 'prop-types';
import { useState } from 'react';

function CommentInput({ addComment }) {
  const [content, setContent] = useState('');

  const handleCommentChange = (event) => {
    setContent(event.target.innerHTML);
  };

  const handleSubmit = () => {
    if (content.trim()) {
      addComment(content);
      setContent('');
      document.querySelector('.comment-input-editable').innerHTML = '';
    }
  };

  return (
    <div className="comment-input-container">
      <div
        className="comment-input-editable"
        contentEditable
        onInput={handleCommentChange}
        suppressContentEditableWarning
      />
      <button type="button" className="btn btn-primary" onClick={handleSubmit}>
        Kirim Komentar
      </button>
    </div>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;
