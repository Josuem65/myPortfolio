import React from 'react';
import logo from './logo.svg';
import { Nav } from './features/nav/Nav';
import { Content } from './features/content/Content';
import { Tiles } from './features/tiles/Tiles';
import { Connections } from './features/connections/Connections';
import { Popup } from './features/popup/Popup';
import { BuyMeACoffee } from './features/buyMeACoffee/BuyMeACoffee';
import './App.css';
import './features/nav/nav.css';
import './features/tiles/tiles.css';
import './features/connections/connections.css';
import './features/popup/popup.css';
import './features/buyMeACoffee/buyMeACoffee.css';

function App() {
  return (
    <div className="App">
      <Nav />
      <Content />
      <Tiles />
      <Connections />
      <Popup />
      <BuyMeACoffee />
    </div>
  );
}

export default App;
