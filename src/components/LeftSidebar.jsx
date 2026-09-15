import { Link } from 'react-router-dom';
import {
  FiMessageSquare, FiTrendingUp, FiHelpCircle, FiBookmark, FiBookOpen, FiLifeBuoy,
} from 'react-icons/fi';
import { useSelector } from 'react-redux';

function LeftSidebar() {
  const { threads = [], authUser } = useSelector((states) => states);

  // Extract popular tags (top 4 for aesthetic purposes)
  const categories = Array.from(new Set(threads.map((thread) => thread.category))).slice(0, 4);

  return (
    <aside className="left-sidebar">
      <div className="sidebar-section">
        <h4 className="sidebar-title">Navigasi Utama</h4>
        <nav className="sidebar-nav">
          <Link to="/" className="sidebar-nav-item active">
            <FiMessageSquare />
            {' '}
            Semua Diskusi
          </Link>
          <button type="button" className="sidebar-nav-item">
            <FiTrendingUp />
            {' '}
            Populer
          </button>
          <button type="button" className="sidebar-nav-item">
            <FiHelpCircle />
            {' '}
            Belum Terjawab
          </button>
          <button type="button" className="sidebar-nav-item">
            <FiBookmark />
            {' '}
            Tag Tersimpan
          </button>
        </nav>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-title-row">
          <h4 className="sidebar-title">TAG POPULER</h4>
          <span className="sidebar-title-icon">#</span>
        </div>
        <div className="popular-tags">
          {categories.map((category) => (
            <Link key={category} to="/" className="sidebar-tag">
              #
              {category}
            </Link>
          ))}
        </div>
      </div>

      {authUser && (
        <div className="sidebar-section">
          <div className="session-card">
            <p>Sesi Terhubung</p>
            <span>
              Bearer:
              {' '}
              {authUser.email.substring(0, 10)}
              ...
            </span>
          </div>
        </div>
      )}

      <div className="sidebar-footer">
        <button type="button" className="sidebar-footer-item">
          <FiBookOpen />
          {' '}
          Panduan Komunitas
        </button>
        <button type="button" className="sidebar-footer-item">
          <FiLifeBuoy />
          {' '}
          Bantuan
        </button>
      </div>
    </aside>
  );
}

export default LeftSidebar;
