import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import { formatDistanceToNow } from 'date-fns';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteDetail,
  asyncToggleDownVoteDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
} from '../states/threadDetail/threadDetailSlice';
import CommentItem from '../components/CommentItem';
import CommentInput from '../components/CommentInput';
import VoteButton from '../components/VoteButton';

function DetailPage() {
  const { id } = useParams();
  const { threadDetail = null, authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ content, threadId: id }));
  };

  const onUpVoteThread = () => {
    if (!authUser) {
      alert('Silakan login untuk memberikan vote.');
      return;
    }
    dispatch(asyncToggleUpVoteDetail());
  };

  const onDownVoteThread = () => {
    if (!authUser) {
      alert('Silakan login untuk memberikan vote.');
      return;
    }
    dispatch(asyncToggleDownVoteDetail());
  };

  const onUpVoteComment = (commentId) => {
    if (!authUser) {
      alert('Silakan login untuk memberikan vote.');
      return;
    }
    dispatch(asyncToggleUpVoteComment(commentId));
  };

  const onDownVoteComment = (commentId) => {
    if (!authUser) {
      alert('Silakan login untuk memberikan vote.');
      return;
    }
    dispatch(asyncToggleDownVoteComment(commentId));
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <section className="detail-page-new">
      <div className="thread-detail-header-new">
        <div className="thread-meta-left">
          <span className="thread-category-badge">
            #
            {threadDetail.category}
          </span>
          <span className="meta-dot">&bull;</span>
          <span className="thread-time">
            {formatDistanceToNow(new Date(threadDetail.createdAt))}
            {' '}
            ago
          </span>
        </div>
        <h2 className="thread-title-new" style={{ marginTop: '0.75rem', fontSize: '1.5rem' }}>{threadDetail.title}</h2>

        <div className="thread-author-new" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
          <div className="author-pill">
            <img src={threadDetail.owner.avatar} alt={threadDetail.owner.name} />
            <span className="author-name">{threadDetail.owner.name}</span>
            <span className="author-status-dot" />
          </div>
        </div>
      </div>

      <div className="thread-body-new" style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>
        {parse(threadDetail.body)}
      </div>

      <div className="thread-item-footer-new" style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
        <div className="thread-footer-left">
          <VoteButton
            upVotesBy={threadDetail.upVotesBy}
            downVotesBy={threadDetail.downVotesBy}
            authUserId={authUser ? authUser.id : null}
            onUpVote={onUpVoteThread}
            onDownVote={onDownVoteThread}
          />
        </div>
      </div>

      <div className="thread-comments-section">
        <h3 className="comments-title">
          Komentar (
          {threadDetail.comments.length}
          )
        </h3>

        {authUser ? (
          <div className="comment-input-wrapper">
            <img src={authUser.avatar} alt={authUser.name} className="comment-input-avatar" />
            <div className="comment-input-box-wrapper">
              <CommentInput addComment={onAddComment} />
            </div>
          </div>
        ) : (
          <div className="login-to-comment">
            <p>
              <Link to="/login">Login</Link>
              {' '}
              untuk ikut berdiskusi.
            </p>
          </div>
        )}

        <div className="comments-list">
          {threadDetail.comments.map((comment) => (
            <CommentItem
              key={comment.id}
              id={comment.id}
              content={comment.content}
              createdAt={comment.createdAt}
              owner={comment.owner}
              upVotesBy={comment.upVotesBy}
              downVotesBy={comment.downVotesBy}
              authUserId={authUser ? authUser.id : null}
              onUpVote={onUpVoteComment}
              onDownVote={onDownVoteComment}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DetailPage;
