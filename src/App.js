import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import LoginPage from './pages/login/LoginPage';
import { createBrowserHistory } from 'history';
import './App.css';

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/login' />
          </Route>
          <Route path='/login'>
            <LoginPage history={history}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
