import React, { useState, useRef, useEffect } from 'react';
import { isMobileOnly } from 'react-device-detect';
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

    const updateHeight = () => {
      const connectMain = localConnectRef.current;
      if (connectMain) {
        const width = connectMain.offsetWidth;
        connectMain.style.height = `${Math.max(width * 0.75, connectMain.scrollHeight)}px`; // Set height to 75% of width or content height
      }
    };

    updateHeight(); // Set initial height
    window.addEventListener('resize', updateHeight); // Update height on window resize

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const connectPath = (logo) => {
    window.open(logo.link, "_blank");
  };
  
  return (
    //         ADD LEETCODE USERNAME TO THIS SOON!!!!!!
    <div ref={localConnectRef} className={isMobileOnly ? "mobileConnectMain connectMain" : "connectMain"}>
      <h1>Let's Connect</h1>
      {connectObj.map((logo) => {
        return (
          <div className={isMobileOnly ? "mobileConnectContainer connectContainer": "connectContainer"} key={logo.id}>
            <div className="connectBox">
              <div className="profilePicContainer">
                <img src={logo.profileURL} alt={logo.caption} onClick={() => connectPath(logo)} />
              </div>   
              <div className="logoContainer">
                <img className={logo.id === 1 ? 'gitHubLogo': null} onClick={() => connectPath(logo)} src={logo.image} alt={logo.name} />
                <p className="connectPath" onClick={() => connectPath(logo)}>{logo.profilePath} </p>
              </div>
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