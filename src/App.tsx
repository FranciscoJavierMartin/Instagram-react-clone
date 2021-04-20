import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import {
  DASHBOARD_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  SIGNUP_PAGE_ROUTE,
} from './constants/routes';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path={DASHBOARD_PAGE_ROUTE} component={DashboardPage} />
          <Route exact path={LOGIN_PAGE_ROUTE} component={LoginPage} />
          <Route exact path={SIGNUP_PAGE_ROUTE} component={SignUpPage} />
          <Route exact path={SIGNUP_PAGE_ROUTE} component={SignUpPage} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
