import PropTypes from 'prop-types';

function LeaderboardItem({ user, score }) {
  return (
    <div className="leaderboard-item">
      <div className="leaderboard-user">
        <img src={user.avatar} alt={user.name} />
        <span className="user-name">{user.name}</span>
      </div>
      <div className="leaderboard-score">
        {score}
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

const leaderboardItemShape = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
};

LeaderboardItem.propTypes = {
  ...leaderboardItemShape,
};

export { leaderboardItemShape };
export default LeaderboardItem;
