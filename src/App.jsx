import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import Navigation from './components/Navigation';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { asyncPreloadProcess } from './states/isPreload/isPreloadSlice';
import { asyncUnsetAuthUser } from './states/authUser/authUserSlice';

import HomePage from './pages/HomePage';
import LeaderboardPage from './pages/LeaderboardPage';
import DetailPage from './pages/DetailPage';
import AddThreadPage from './pages/AddThreadPage';

import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';

// Vite CommonJS interop fix
const LoadingComponent = LoadingBar.default || LoadingBar;

function App() {
  const { authUser, isPreload } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  return (
    <div className="app-container">
      <LoadingComponent className="loading-bar" />

      {!isPreload && (
        <>
          <header>
            <Navigation authUser={authUser} signOut={onSignOut} />
          </header>
          <div className="app-main-layout">
            <LeftSidebar />
            <main>
              <Routes>
                <Route path="/*" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/leaderboards" element={<LeaderboardPage />} />
                <Route path="/thread/:id" element={<DetailPage />} />
                <Route path="/new" element={<AddThreadPage />} />
              </Routes>
            </main>
            <RightSidebar />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
