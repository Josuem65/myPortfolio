import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount } from './navSlice';
import { selectTogglePopup, togglePopup } from '../popup/popupSlice';
import styles from './nav.css';
import { tilesRef } from '../tiles/Tiles';
import { techRef } from '../tech/Tech';
import { connectRef } from '../connections/Connections';
import { buyMeCoffeeRef } from '../buyMeACoffee/BuyMeACoffee';

export function Nav() {
  const count = useSelector(selectCount);
  const popupStatus = useSelector(selectTogglePopup);
  const dispatch = useDispatch();
  const navList = ['myPortfolio', 'Tech Stack', 'Connect', 'Buy me a coffee'];
  
  const handleNavClick = (section) => {
    let ref;
    switch (section) {
      case 'myPortfolio':
        ref = tilesRef;
        break;
      case 'Tech Stack':
        ref = techRef;
        break;
      case 'Connect':
        ref = connectRef;
        break;
      case 'Buy me a coffee':
        ref = buyMeCoffeeRef;
        break;
      default:
        return;
    }

    if (ref?.current) {
      const offset = -55; // Adjust this value based on your header height
      const elementPosition = ref.current.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
    return popupStatus ? dispatch(togglePopup()) : null;
  };

  return (
      <div className="mainNav">
        {navList.map((item) => (
          <div
            onClick={() => handleNavClick(item)}
            className={item === 'myPortfolio' ? "navItem homeNav" : "navItem navOptions"}
            key={Math.random(32)}
          >
            {item}
          </div>
        ))}
      </div>
  );
}
