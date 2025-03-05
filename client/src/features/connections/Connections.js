import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount } from './connectionsSlice';
import connectLogos from './connectLogos';

export function Connections() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const connectPath = (logo) => {
    window.open(logo.link, "_blank");
  }
  
  return (
    //         ADD LEETCODE USERNAME TO THIS SOON!!!!!!
    <div className="connectMain">
      <h1>Connect</h1>
      {connectLogos.map((logo) => {
        return (
          <div className="connectContainer">
            <div className="connectBox" key={logo.id}>
              <div className="profilePicContainer">
                <img src={logo.profileURL} alt={logo.caption} />
              </div>   
              <div className="logoContainer">
                <img className={logo.id === 1 ? 'gitHubLogo': null} onClick={() => connectPath(logo)} src={logo.image} alt={logo.name} />
                <p className="connectPath" onClick={() => connectPath(logo)}>{logo.profilePath} </p>
              </div>
              {/* <div className="followDiv">
                <div className="followBtn">Follow +</div>
              </div> */}
            </div>
            <div className="connectText">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

