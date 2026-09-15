import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiCheckCircle, FiActivity, FiAward } from 'react-icons/fi';

function RightSidebar() {
  const { leaderboards = [] } = useSelector((states) => states);

  // Ambil top 4 leaderboards
  const topLeaderboards = leaderboards.slice(0, 4);

  return (
    <aside className="right-sidebar">
      {/* Widget Leaderboards */}
      <div className="widget-card">
        <div className="widget-header">
          <h4 className="widget-title">
            <FiAward style={{ marginRight: '8px' }} />
            Leaderboards
          </h4>
          <Link to="/leaderboards" className="widget-action-link">Semua &rarr;</Link>
        </div>
        <div className="widget-body">
          {topLeaderboards.map((item, index) => (
            <div key={item.user.id} className="leaderboard-preview-item">
              <span className="rank-number">
                #
                {index + 1}
              </span>
              <img src={item.user.avatar} alt={item.user.name} />
              <div className="leaderboard-preview-info">
                <span className="user-name">{item.user.name}</span>
                <span className="user-level">
                  Level
                  {' '}
                  {10 + index}
                  {' '}
                  &bull;
                  {' '}
                  {index === 0 ? 'Grandmaster' : 'Contributor'}
                </span>
              </div>
              <span className="score">
                {item.score}
                {' '}
                pt
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Widget Pedoman */}
      <div className="widget-card">
        <div className="widget-header">
          <h4 className="widget-title">
            <FiCheckCircle style={{ marginRight: '8px' }} />
            Pedoman Berdiskusi
          </h4>
        </div>
        <div className="widget-body widget-list">
          <ul>
            <li>Gunakan bahasa yang santun dan konstruktif.</li>
            <li>Sertakan baris kode dan pesan error secara jelas saat bertanya.</li>
            <li>Tandai jawaban terbaik jika masalahmu sudah terpecahkan.</li>
          </ul>
        </div>
      </div>

      {/* Widget Aktivitas */}
      <div className="widget-card">
        <div className="widget-header">
          <h4 className="widget-title">
            <FiActivity style={{ marginRight: '8px' }} />
            Aktivitas Harian
          </h4>
          <span className="status-dot" />
        </div>
        <div className="widget-body stats-grid">
          <div className="stat-box">
            <span className="stat-value">1.2k</span>
            <span className="stat-label">DISKUSI</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">4.5k</span>
            <span className="stat-label">PENGEMBANG</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">98%</span>
            <span className="stat-label">TERJAWAB</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default RightSidebar;
