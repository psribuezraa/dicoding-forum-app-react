import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { asyncPopulateUsersAndThreads } from '../states/shared/thunk';
import {
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncAddThread,
} from '../states/threads/threadsSlice';
import ThreadList from '../components/ThreadList';
import ThreadInput from '../components/ThreadInput';

function HomePage() {
  const {
    threads = [], users = [], authUser = null,
  } = useSelector((states) => states);
  const dispatch = useDispatch();
  const [filterCategory, setFilterCategory] = useState('');
  const [activeTab, setActiveTab] = useState('Terbaru');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const categories = Array.from(new Set(threads.map((thread) => thread.category)));

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('q')?.toLowerCase() || '';

  const filteredThreads = threadList.filter((thread) => {
    const matchesCategory = filterCategory ? thread.category === filterCategory : true;
    const matchesSearch = searchKeyword
      ? thread.title.toLowerCase().includes(searchKeyword)
        || thread.body.toLowerCase().includes(searchKeyword)
      : true;
    return matchesCategory && matchesSearch;
  });

  const onFilterChange = (category) => {
    if (filterCategory === category) {
      setFilterCategory('');
    } else {
      setFilterCategory(category);
    }
  };

  const onUpVote = (threadId) => {
    if (!authUser) {
      alert('Silakan login untuk memberikan vote.');
      return;
    }
    dispatch(asyncToggleUpVoteThread(threadId));
  };

  const onDownVote = (threadId) => {
    if (!authUser) {
      alert('Silakan login untuk memberikan vote.');
      return;
    }
    dispatch(asyncToggleDownVoteThread(threadId));
  };

  const onAddThread = async ({ title, body, category }) => {
    await dispatch(asyncAddThread({ title, body, category }));
  };

  return (
    <section className="home-page">
      <div className="category-filter-card">
        <div className="category-filter-header-new">
          <h3>Kategori Populer</h3>
          <span className="badge">
            {categories.length}
            {' '}
            Tag Tren
          </span>
        </div>
        <p className="category-subtitle">Temukan percakapan relevan dan diskusikan solusi pemrograman bersama.</p>
        <div className="category-list horizontal-scroll">
          <button
            type="button"
            className={`category-item ${filterCategory === '' ? 'active' : ''}`}
            onClick={() => setFilterCategory('')}
          >
            #semua
          </button>
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={`category-item ${filterCategory === category ? 'active' : ''}`}
              onClick={() => onFilterChange(category)}
            >
              #
              {category}
            </button>
          ))}
        </div>
      </div>

      {authUser && (
        <div className="inline-create-thread form-container" style={{ maxWidth: '100%', padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', fontFamily: 'Newsreader', fontSize: '1.25rem' }}>Buat Diskusi Baru</h3>
          <ThreadInput addThread={onAddThread} />
        </div>
      )}

      <div className="feed-sort-header">
        <div className="sort-tabs">
          <button type="button" className={`sort-tab ${activeTab === 'Terbaru' ? 'active' : ''}`} onClick={() => setActiveTab('Terbaru')}>Terbaru</button>
          <button type="button" className={`sort-tab ${activeTab === 'Paling Aktif' ? 'active' : ''}`} onClick={() => setActiveTab('Paling Aktif')}>Paling Aktif</button>
          <button type="button" className={`sort-tab ${activeTab === 'Disukai' ? 'active' : ''}`} onClick={() => setActiveTab('Disukai')}>Disukai</button>
        </div>
        <span className="feed-count">
          Menampilkan
          {' '}
          {filteredThreads.length}
          {' '}
          dari
          {' '}
          {threads.length}
          {' '}
          diskusi
        </span>
      </div>

      <ThreadList
        threads={filteredThreads}
        authUserId={authUser ? authUser.id : null}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
      />
    </section>
  );
}

export default HomePage;
