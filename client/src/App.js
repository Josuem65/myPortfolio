import React from 'react';
import { Nav } from './features/nav/Nav';
import { Content } from './features/content/Content';
import { Profile } from './features/profile/Profile';
import { Tiles } from './features/tiles/Tiles';
import { Connections } from './features/connections/Connections';
import { Tech } from './features/tech/Tech';
import { BuyMeACoffee } from './features/buyMeACoffee/BuyMeACoffee';
import { Popup } from './features/popup/Popup';
import './App.css';
import './features/nav/nav.css';
import './features/content/content.css';
import './features/profile/profile.css';
import './features/tiles/tiles.css';
import './features/connections/connections.css';
import './features/popup/popup.css';
import './features/tech/tech.css';
import './features/buyMeACoffee/buyMeACoffee.css';

function App() {
  return (
    <div className="App">
      <Nav />
      <Content />
      <Profile />
      <Tiles />
      <Tech />
      <Connections />
      <BuyMeACoffee />
      <Popup />
    </div>
  );
}

export default App;
