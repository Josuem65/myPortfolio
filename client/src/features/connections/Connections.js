import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount } from './connectionsSlice';
import connectObj from './connectLogos';

export const connectRef = React.createRef();

export function Connections() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  const localConnectRef = useRef(null);

  useEffect(() => {
    connectRef.current = localConnectRef.current; // Assign the local reference to the exported reference
  }, []);

  const connectPath = (logo) => {
    window.open(logo.link, "_blank");
  };
  
  return (
    //         ADD LEETCODE USERNAME TO THIS SOON!!!!!!
    <div ref={localConnectRef} className="connectMain">
      <h1>Connect</h1>
      {connectObj.map((logo) => {
        return (
          <div className="connectContainer" key={logo.id}>
            <div className="connectBox">
              <div className="profilePicContainer">
                <img src={logo.profileURL} alt={logo.caption} onClick={() => connectPath(logo)} />
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
              <p>{logo.paragraph}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}