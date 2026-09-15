import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem';

function ThreadList({
  threads, authUserId, onUpVote, onDownVote,
}) {
  if (threads.length === 0) {
    return <p className="empty-state">No threads found in this category.</p>;
  }

  return (
    <div className="thread-list">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          id={thread.id}
          title={thread.title}
          body={thread.body}
          category={thread.category}
          createdAt={thread.createdAt}
          upVotesBy={thread.upVotesBy}
          downVotesBy={thread.downVotesBy}
          totalComments={thread.totalComments}
          user={thread.user}
          authUserId={authUserId}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

ThreadList.defaultProps = {
  authUserId: null,
};

export default ThreadList;
