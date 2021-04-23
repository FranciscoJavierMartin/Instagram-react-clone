import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import {
  DASHBOARD_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  SIGNUP_PAGE_ROUTE,
} from './constants/routes';
import UserContext from './context/user';
import useAuthListener from './hooks/useAuthListener';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './helpers/protected.routes';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

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
            <Route exact path={LOGIN_PAGE_ROUTE} component={LoginPage} />
            <Route exact path={SIGNUP_PAGE_ROUTE} component={SignUpPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
