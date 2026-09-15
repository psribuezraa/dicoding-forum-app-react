import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import parse from 'html-react-parser';
import VoteButton from './VoteButton';

function CommentItem({
  id, content, createdAt, owner,
  upVotesBy, downVotesBy, authUserId,
  onUpVote, onDownVote,
}) {
  return (
    <div className="comment-item-new" id={`comment-${id}`}>
      <div className="comment-item-header-new">
        <img src={owner.avatar} alt={owner.name} />
        <div className="comment-item-info-new">
          <p className="comment-item-name-new">{owner.name}</p>
          <span className="meta-dot">&bull;</span>
          <p className="comment-item-date-new">
            {formatDistanceToNow(new Date(createdAt))}
            {' '}
            ago
          </p>
        </div>
      </div>
      <div className="comment-item-content-new">
        {parse(content)}
      </div>
      <div className="comment-item-actions-new">
        <VoteButton
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUserId={authUserId}
          onUpVote={() => onUpVote(id)}
          onDownVote={() => onDownVote(id)}
        />
      </div>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

CommentItem.propTypes = {
  ...commentItemShape,
};

CommentItem.defaultProps = {
  authUserId: null,
};

export { commentItemShape };
export default CommentItem;
