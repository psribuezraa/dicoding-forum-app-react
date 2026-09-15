import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeaderboardItem from '../components/LeaderboardItem';
import { asyncPopulateLeaderboards } from '../states/leaderboards/leaderboardsSlice';

function LeaderboardPage() {
  const leaderboards = useSelector((states) => states.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  return (
    <section className="leaderboards-page">
      <h2>Klasemen Pengguna Aktif</h2>
      <div className="leaderboards-list">
        <header className="leaderboards-header">
          <p>Pengguna</p>
          <p>Skor</p>
        </header>
        {leaderboards.map((leaderboard) => (
          <LeaderboardItem
            key={leaderboard.user.id}
            user={leaderboard.user}
            score={leaderboard.score}
          />
        ))}
      </div>
    </section>
  );
}

export default LeaderboardPage;
