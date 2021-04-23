import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import {
  DASHBOARD_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  SIGNUP_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE
} from './constants/routes';
import UserContext from './context/user';
import useAuthListener from './hooks/useAuthListener';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './helpers/ProtectedRoute';
import IsUserLoggedIn from './helpers/IsUserLoggedIn';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<Loading />}>
          <Switch>
            <ProtectedRoute user={user} path={DASHBOARD_PAGE_ROUTE} exact>
              <DashboardPage />
            </ProtectedRoute>
            <ProtectedRoute user={user} path={PROFILE_PAGE_ROUTE} exact>
              <ProfilePage />
            </ProtectedRoute>
            <IsUserLoggedIn
              user={user}
              loggedInPath={DASHBOARD_PAGE_ROUTE}
              path={LOGIN_PAGE_ROUTE}
              exact
            >
              <LoginPage />
            </IsUserLoggedIn>
            <IsUserLoggedIn
              user={user}
              loggedInPath={DASHBOARD_PAGE_ROUTE}
              path={SIGNUP_PAGE_ROUTE}
              exact
            >
              <SignUpPage />
            </IsUserLoggedIn>
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
