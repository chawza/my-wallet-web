import { BrowserRouter as Router, Route, Redirect, Switch, useHistory } from 'react-router-dom'
import LoginPage from './pages/login/LoginPage';
import './App.css';
import { isUserAuthenticated } from './utils/Session';
import DashboardPage from './pages/Dashboard/DashboardPage';
import TransactionRecordPage from './pages/TransactionRecord/TransactionRecordPage';
import UserPage from './pages/UserPage/UserPage';


const AuthenticatedRoute = ({history, Component}) => {
  if (!isUserAuthenticated()) {
    history.push({pathname: '/login'});
  }
  return Component;
}

function App() {
  const history = useHistory();
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <Router>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/login'/>
          </Route>
          <Route path='/login'>
            <LoginPage/>
          </Route>
          <Route path='/dashboard'>
            <AuthenticatedRoute 
              history={history}
              Component={<DashboardPage/>}
            />  
          </Route>
          <Route path='/transaction-record'>
            <AuthenticatedRoute 
              history={history}
              Component={<TransactionRecordPage/>}
            />
          </Route>
          <Route path='/profile'>
            <AuthenticatedRoute
              history={history}
              Component={<UserPage/>}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
