import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import LoginPage from './pages/login/LoginPage';
import { createBrowserHistory } from 'history';
import './App.css';
import DashboardPage from './pages/Dashboard/DashboardPage';
import { isUserAuthenticated } from './utils/Session';

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <Router>
        <Switch>
          <Route exact path='/'>
            {!isUserAuthenticated() ? <Redirect to='/login' /> : <Redirect to='/dashboard' /> }
          </Route>
          <Route path='/login'>
            <LoginPage history={history}/>
          </Route>
          <Route path='/dashboard'>
            <DashboardPage history={history} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
