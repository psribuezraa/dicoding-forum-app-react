import PropTypes from 'prop-types';
import {
  FiThumbsUp, FiThumbsDown,
} from 'react-icons/fi';

function VoteButton({
  upVotesBy, downVotesBy, authUserId, onUpVote, onDownVote,
}) {
  const isUpVoted = authUserId && upVotesBy.includes(authUserId);
  const isDownVoted = authUserId && downVotesBy.includes(authUserId);

  return (
    <div className="vote-pill">
      <button
        type="button"
        className={`vote-btn-pill left-pill ${isUpVoted ? 'voted-up' : ''}`}
        onClick={onUpVote}
        title="Upvote"
      >
        <FiThumbsUp />
        {' '}
        {upVotesBy.length}
      </button>
      <div className="pill-divider" />
      <button
        type="button"
        className={`vote-btn-pill right-pill ${isDownVoted ? 'voted-down' : ''}`}
        onClick={onDownVote}
        title="Downvote"
      >
        <FiThumbsDown />
        {' '}
        {downVotesBy.length}
      </button>
    </div>
  );
}

VoteButton.propTypes = {
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

VoteButton.defaultProps = {
  authUserId: null,
};

export default VoteButton;
