import * as React from 'react';
import './App.css';

import GroupList from "./GroupList";
import logo from './logo.svg';

class App extends React.Component<{}, any> {

    public render() {

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div className="App-intro">
                    <GroupList/>
                </div>
            </div>
        );
    }
}

export default App;
