import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import { LOGIN_PAGE } from './constants/routes';

const LoginPage = lazy(() => import('./pages/LoginPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path={LOGIN_PAGE} component={LoginPage}></Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
