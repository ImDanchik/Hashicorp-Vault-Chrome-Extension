import React, { useState, useEffect } from 'react';
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import NavBar from './Components/navbar';
import LoginForm from './Components/loginForm';
import useToken from './Utils/useToken';
import useVltAddr from './Utils/useVltAddr';
import Emitter from './Utils/Emitter'
import EngineList from './Components/engineList';
import SecretList from './Components/secretList';

function App() {
  const { token, setToken } = useToken()
  const { vltAddr, setVltAddr } = useVltAddr();
  const [currentNamespace, setCurrentNamespace] = useState('/');
  const [engine, setEngine] = useState('');
  const [folder, setFolder] = useState('/');

  useEffect(() => {
    Emitter.on('NAMESPACE_CLICKED', (path) => {
      setCurrentNamespace(path);
    });
    Emitter.on('ENGINE_CLICKED', (name) => {   
      setEngine(name);
    });
    Emitter.on('FOLDER_CLICKED', (name) => {   
      setFolder(name);
    });
    Emitter.on('RESET_PATH', () => {   
      setFolder('/');
    });
  }, [])

  return (
    <div className="App" id="appParent" style={{ minWidth: '400px', maxWidth: '400px', minHeight: '500px', maxHeight: '500px' }}>
      <div className="App-intro" id="appChild">
        <Router>
          {
            <NavBar id="navbar" vltAddr={vltAddr} isLoggedIn={token ? true : false} setToken={setToken} setVltAddr={setVltAddr}/>
          }
          {token ?
            <Switch id="content">
              <Route exact path="/">
                <EngineList token={token} vltAddr={vltAddr}/>
              </Route>
              <Route path="/secret">
                <SecretList token={token} engine={engine} folder={folder} vltAddr={vltAddr}/>
              </Route>
            </Switch>
            :
            <React.Fragment>
              <LoginForm vltAddr={vltAddr} setToken={setToken} setVltAddr={setVltAddr} />
              {vltAddr && <label>{vltAddr}</label>}
            </React.Fragment>
          }
        </Router>
      </div>
    </div>
  );
}

export default App;
