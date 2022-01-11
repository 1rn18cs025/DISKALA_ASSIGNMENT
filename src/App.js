// import logo from './logo.svg';?
import './App.css';
import './css/navbar.css';
import ProtectedRoute  from './components/Protectedroute';
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/signup";
import CreateCandidate from './pages/create_cand';
import ViewCandidate from './pages/candidateView';
import NavBar from "./components/navBar";
import { useState } from 'react';
import { useEffect } from 'react';
import Home from './pages/home';
import EditCandidate from './pages/editCandidate';
function App() {
  const [token,setToken] = useState(sessionStorage.getItem('token'))
  // const hastoken = sessionStorage.getItem('token');
  return (
    <Router> 
      <NavBar token={token} setToken={setToken}/>
      <main class="site-wrapper">
      <Switch>
        <Route path='/editCandidate/:id' exact>
        <EditCandidate/>
        </Route>
        <Route path='/' exact>
          <Home/>
        </Route>
        <Route path='/signup' exact>
          <Signup setToken={setToken}/>
        </Route>
        <Route path='/login' exact>
          <Login setToken={setToken}/>
        </Route>
        <ProtectedRoute path='/addcandidate' component={CreateCandidate} exact/>
        <ProtectedRoute path='/viewcandidate' component={ViewCandidate} exact/>
      </Switch>
      </main>
    </Router>
  );
}

export default App;
