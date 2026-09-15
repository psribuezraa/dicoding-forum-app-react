import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  FiMessageSquare, FiClock, FiBookmark, FiShare2,
} from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import parse from 'html-react-parser';
import VoteButton from './VoteButton';

function ThreadItem({
  id, title, body, category, createdAt,
  upVotesBy, downVotesBy, totalComments,
  user, authUserId, onUpVote, onDownVote,
}) {
  return (
    <div className="thread-item-new">
      <div className="thread-item-header-new">
        <div className="thread-meta-left">
          <span className="thread-category-badge">
            #
            {category}
          </span>
          <span className="meta-dot">&bull;</span>
          <span className="thread-time">
            <FiClock />
            {' '}
            {formatDistanceToNow(new Date(createdAt))}
            {' '}
            ago
          </span>
        </div>
        <div className="thread-meta-right">
          <button type="button" className="action-icon-btn" title="Simpan">
            <FiBookmark />
          </button>
          <button type="button" className="action-icon-btn" title="Bagikan">
            <FiShare2 />
          </button>
        </div>
      </div>

      <div className="thread-item-content-new">
        <h3 className="thread-title-new">
          <Link to={`/thread/${id}`}>{title}</Link>
        </h3>
        <div className="thread-body-new">
          {parse(body)}
        </div>
      </div>

      <div className="thread-item-footer-new">
        <div className="thread-footer-left">
          <VoteButton
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
            authUserId={authUserId}
            onUpVote={() => onUpVote(id)}
            onDownVote={() => onDownVote(id)}
          />
          <Link to={`/thread/${id}`} className="reply-count-btn">
            <FiMessageSquare />
            {' '}
            {totalComments}
            {' '}
            balasan
          </Link>
        </div>
        <div className="thread-author-new">
          <span className="author-label">Dibuat oleh</span>
          <div className="author-pill">
            <img src={user.avatar} alt={user.name} />
            <span className="author-name">{user.name}</span>
            <span className="author-status-dot" />
          </div>
        </div>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
};

ThreadItem.defaultProps = {
  authUserId: null,
};

export { threadItemShape };
export default ThreadItem;
