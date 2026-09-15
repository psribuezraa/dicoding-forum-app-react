import PropTypes from 'prop-types';
import {
  Link, useLocation, useNavigate, useSearchParams,
} from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  FiLogOut, FiLogIn, FiSearch, FiBell, FiChevronDown, FiMessageSquare, FiHash, FiAward,
} from 'react-icons/fi';

function Navigation({ authUser, signOut }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialKeyword = searchParams.get('q') || '';
  const [keyword, setKeyword] = useState(initialKeyword);
  const searchInputRef = useRef(null);

  const getNavClass = (path) => `nav-link ${location.pathname === path ? 'active' : ''}`;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?q=${encodeURIComponent(keyword)}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <Link to="/" className="logo-brand">
          <span className="logo-text">Dicoding</span>
          <span className="logo-text-sub">Forum</span>
        </Link>
      </div>

      <div className="top-bar-middle">
        <form className="search-bar" onSubmit={onSearchSubmit}>
          <FiSearch className="search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Cari diskusi, topik, atau pengguna..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <span className="search-shortcut">Ctrl+K</span>
        </form>

        <nav className="main-nav">
          <Link to="/" className={getNavClass('/')}>
            <FiMessageSquare />
            {' '}
            Diskusi
          </Link>
          <Link to="/" className="nav-link">
            <FiHash />
            {' '}
            Kategori
          </Link>
          <Link to="/leaderboards" className={getNavClass('/leaderboards')}>
            <FiAward />
            {' '}
            Leaderboards
          </Link>
        </nav>
      </div>

      <div className="top-bar-right">
        {authUser ? (
          <>
            <button type="button" className="icon-btn" title="Notifikasi">
              <FiBell />
            </button>
            <div className="user-dropdown">
              <div className="user-profile-btn">
                <img src={authUser.avatar} alt={authUser.name} />
                <div className="user-profile-info">
                  <span className="user-name">{authUser.name}</span>
                </div>
                <FiChevronDown />
              </div>
              <div className="dropdown-menu">
                <button type="button" onClick={signOut} className="dropdown-item">
                  <FiLogOut />
                  {' '}
                  Sign Out
                </button>
              </div>
            </div>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary">
            <FiLogIn style={{ marginRight: '8px' }} />
            {' '}
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape),
  signOut: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
  authUser: null,
};

export default Navigation;
